package com.pmp.platform.auth;

import com.pmp.platform.common.ApiException;
import com.pmp.platform.system.MenuService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/** 认证核心流程：登录、锁定、双令牌签发/刷新、登出、菜单与权限加载。 */
@Service
public class AuthService {

    private final JdbcTemplate jdbc;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final SessionStore sessionStore;
    private final MenuService menuService;
    private final AuthProperties props;

    public AuthService(JdbcTemplate jdbc, PasswordEncoder passwordEncoder, JwtService jwtService,
                       SessionStore sessionStore, MenuService menuService, AuthProperties props) {
        this.jdbc = jdbc;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.sessionStore = sessionStore;
        this.menuService = menuService;
        this.props = props;
    }

    public Map<String, Object> login(String username, String password, HttpServletRequest request) {
        String ip = clientIp(request);
        String ua = request.getHeader("User-Agent");
        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            throw new ApiException(400, "请输入账号与密码");
        }
        List<Map<String, Object>> users = jdbc.queryForList(
                "select * from app.sys_user where username=? and deleted=0", username);
        if (users.isEmpty()) {
            log(username, ip, ua, "FAIL", "账号不存在");
            throw new ApiException(401, "账号或密码错误");
        }
        Map<String, Object> user = users.get(0);
        long userId = ((Number) user.get("id")).longValue();

        if (!"启用".equals(user.get("status"))) {
            log(username, ip, ua, "FAIL", "账号已停用");
            throw new ApiException(403, "账号已停用，请联系管理员");
        }
        Timestamp lockedUntil = (Timestamp) user.get("locked_until");
        if (lockedUntil != null && lockedUntil.toInstant().isAfter(Instant.now())) {
            log(username, ip, ua, "LOCKED", "账号锁定中");
            throw new ApiException(423, "账号已锁定，请于 " + lockedUntil.toLocalDateTime().toLocalTime().truncatedTo(ChronoUnit.MINUTES) + " 后重试");
        }
        if (!passwordEncoder.matches(password, (String) user.get("password_hash"))) {
            long fails = sessionStore.increaseFail(username, props.getFailWindowSeconds());
            jdbc.update("update app.sys_user set fail_count=? where id=?", (int) fails, userId);
            if (fails >= props.getFailLimit()) {
                Instant until = Instant.now().plusSeconds(props.getLockSeconds());
                jdbc.update("update app.sys_user set locked_until=? where id=?", Timestamp.from(until), userId);
                sessionStore.clearFail(username);
                log(username, ip, ua, "LOCKED", "连续失败 " + fails + " 次，锁定账号");
                throw new ApiException(423, "密码连续错误 " + fails + " 次，账号已锁定 " + (props.getLockSeconds() / 60) + " 分钟");
            }
            log(username, ip, ua, "FAIL", "密码错误（第 " + fails + " 次）");
            int left = (int) (props.getFailLimit() - fails);
            throw new ApiException(401, "账号或密码错误，剩余尝试次数 " + left);
        }

        sessionStore.clearFail(username);
        jdbc.update("update app.sys_user set fail_count=0, locked_until=null, last_login_at=now(), last_login_ip=? where id=?",
                ip, userId);

        String sid = UUID.randomUUID().toString().replace("-", "");
        AuthPrincipal principal = buildPrincipal(user, sid);
        if (props.isSingleSession()) {
            sessionStore.kick(userId, props.getAccessTtlSeconds());
        }
        sessionStore.createSession(sid, principal, props.getRefreshTtlSeconds());
        log(username, ip, ua, "SUCCESS", "登录成功");
        return tokens(principal);
    }

    public Map<String, Object> refresh(String refreshToken) {
        Map<String, Object> payload = jwtService.verify(refreshToken);
        if (payload == null || !"refresh".equals(payload.get("typ"))) {
            throw new ApiException(401, "刷新令牌无效或已过期");
        }
        String jti = (String) payload.get("jti");
        String sid = (String) payload.get("sid");
        String stored = sessionStore.takeRefresh(jti);
        if (stored == null || !stored.equals(sid)) {
            throw new ApiException(401, "刷新令牌已被使用，请重新登录");
        }
        AuthPrincipal principal = sessionStore.session(sid);
        if (principal == null) {
            throw new ApiException(401, "会话已失效，请重新登录");
        }
        Map<String, Object> fresh = jdbc.queryForMap(
                "select status, deleted from app.sys_user where id=?", principal.userId());
        if (((Number) fresh.get("deleted")).intValue() != 0 || !"启用".equals(fresh.get("status"))) {
            sessionStore.deleteSession(principal.userId(), sid);
            throw new ApiException(403, "账号已停用");
        }
        return tokens(principal);
    }

    public void logout(String sid) {
        AuthPrincipal principal = CurrentUser.get();
        if (principal != null) {
            sessionStore.deleteSession(principal.userId(), sid);
        }
    }

    public Map<String, Object> profile(AuthPrincipal principal) {
        Map<String, Object> row = jdbc.queryForMap("""
                select u.id, u.username, u.nickname, u.phone, u.email, u.dept_id, u.last_login_at,
                       d.name as dept_name
                from app.sys_user u left join app.sys_dept d on d.id = u.dept_id
                where u.id = ?
                """, principal.userId());
        Map<String, Object> body = new LinkedHashMap<>(row);
        body.put("roles", principal.roles());
        body.put("perms", principal.perms());
        body.put("dataScope", principal.dataScope());
        return body;
    }

    public List<Map<String, Object>> menus(AuthPrincipal principal) {
        return menuService.userMenus(principal);
    }

    public AuthPrincipal buildPrincipal(Map<String, Object> user, String sid) {
        long userId = ((Number) user.get("id")).longValue();
        String username = (String) user.get("username");
        List<Map<String, Object>> roles = jdbc.queryForList("""
                select r.code, r.data_scope from app.sys_role r
                join app.sys_user_role ur on ur.role_id = r.id
                where ur.user_id = ? and r.deleted=0 and r.status='启用'
                """, userId);
        List<String> roleCodes = new ArrayList<>();
        String scope = "SELF";
        for (Map<String, Object> role : roles) {
            roleCodes.add((String) role.get("code"));
            scope = mergeScope(scope, (String) role.get("data_scope"));
        }
        if (roleCodes.isEmpty()) {
            roleCodes.add("none");
        }
        Long deptId = user.get("dept_id") == null ? null : ((Number) user.get("dept_id")).longValue();
        AuthPrincipal base = new AuthPrincipal(userId, username,
                (String) user.get("nickname"), deptId, roleCodes, List.of(), scope, sid);
        List<String> perms = menuService.perms(base);
        return new AuthPrincipal(userId, username, (String) user.get("nickname"), deptId,
                roleCodes, perms, scope, sid);
    }

    private Map<String, Object> tokens(AuthPrincipal principal) {
        String sid = principal.sid();
        String access = jwtService.issue(principal.userId(), principal.username(), sid, "access", props.getAccessTtlSeconds());
        String refresh = jwtService.issue(principal.userId(), principal.username(), sid, "refresh", props.getRefreshTtlSeconds());
        Map<String, Object> payload = jwtService.verify(refresh);
        sessionStore.putRefresh((String) payload.get("jti"), sid, props.getRefreshTtlSeconds());

        Map<String, Object> user = new LinkedHashMap<>();
        user.put("id", principal.userId());
        user.put("username", principal.username());
        user.put("nickname", principal.nickname());
        user.put("deptId", principal.deptId());
        user.put("roles", principal.roles());
        user.put("perms", principal.perms());
        user.put("dataScope", principal.dataScope());

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("accessToken", access);
        body.put("refreshToken", refresh);
        body.put("expiresIn", props.getAccessTtlSeconds());
        body.put("user", user);
        return body;
    }

    private String mergeScope(String a, String b) {
        List<String> order = List.of("ALL", "DEPT_AND_CHILD", "DEPT", "CUSTOM", "SELF");
        int ia = order.indexOf(a);
        int ib = order.indexOf(b);
        if (ia < 0) ia = order.size() - 1;
        if (ib < 0) ib = order.size() - 1;
        return order.get(Math.min(ia, ib));
    }

    public void log(String username, String ip, String ua, String result, String msg) {
        jdbc.update("insert into app.sys_login_log(username,ip,ua,result,msg,created_at) values (?,?,?,?,?,?)",
                username, ip, ua == null ? null : ua.substring(0, Math.min(ua.length(), 250)),
                result, msg, Timestamp.from(Instant.now()));
    }

    private String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
