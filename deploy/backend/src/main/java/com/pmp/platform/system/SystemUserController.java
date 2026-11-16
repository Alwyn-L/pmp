package com.pmp.platform.system;

import com.pmp.platform.auth.AuthPrincipal;
import com.pmp.platform.auth.CurrentUser;
import com.pmp.platform.auth.SessionStore;
import com.pmp.platform.common.ApiException;
import com.pmp.platform.common.PageResult;
import com.pmp.platform.common.Perms;
import com.pmp.platform.common.Result;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** 用户管理：分页查询、增改删、启停、重置密码、角色绑定、强制下线。 */
@RestController
@RequestMapping("/api/v1/system/users")
public class SystemUserController {

    private final JdbcTemplate jdbc;
    private final PasswordEncoder passwordEncoder;
    private final SessionStore sessionStore;

    public SystemUserController(JdbcTemplate jdbc, PasswordEncoder passwordEncoder, SessionStore sessionStore) {
        this.jdbc = jdbc;
        this.passwordEncoder = passwordEncoder;
        this.sessionStore = sessionStore;
    }

    public record UserBody(@NotBlank String username, String nickname, Long deptId, String phone,
                           String email, String status, List<Long> roleIds, String password) {
    }

    public record StatusBody(@NotBlank String status) {
    }

    public record PasswordBody(@NotBlank String password) {
    }

    public record RoleIdsBody(List<Long> roleIds) {
    }

    @GetMapping
    public Result<PageResult<Map<String, Object>>> list(@RequestParam(defaultValue = "1") int page,
                                                        @RequestParam(defaultValue = "10") int size,
                                                        @RequestParam(required = false) String keyword,
                                                        @RequestParam(required = false) Long deptId,
                                                        @RequestParam(required = false) String status,
                                                        @RequestParam(required = false) Long roleId) {
        AuthPrincipal user = CurrentUser.require();
        Perms.require(user, "system:system-user:list");
        StringBuilder where = new StringBuilder(" where u.deleted=0");
        List<Object> args = new ArrayList<>();
        if (keyword != null && !keyword.isBlank()) {
            where.append(" and (u.username ilike ? or u.nickname ilike ? or u.phone ilike ?)");
            for (int i = 0; i < 3; i++) {
                args.add("%" + keyword.trim() + "%");
            }
        }
        if (deptId != null) {
            where.append(" and (u.dept_id = ? or u.dept_id in (select id from app.sys_dept where ancestors like ?))");
            args.add(deptId);
            args.add("%," + deptId + "%");
        }
        if (status != null && !status.isBlank()) {
            where.append(" and u.status = ?");
            args.add(status);
        }
        if (roleId != null) {
            where.append(" and exists (select 1 from app.sys_user_role ur where ur.user_id=u.id and ur.role_id=?)");
            args.add(roleId);
        }
        Long total = jdbc.queryForObject("select count(1) from app.sys_user u" + where, Long.class, args.toArray());
        List<Object> pageArgs = new ArrayList<>(args);
        pageArgs.add(size);
        pageArgs.add((long) (page - 1) * size);
        List<Map<String, Object>> records = jdbc.queryForList("""
                select u.id, u.username, u.nickname, u.dept_id, d.name as dept_name, u.phone, u.email,
                       u.status, u.fail_count, u.locked_until, u.last_login_at, u.last_login_ip, u.created_at,
                       coalesce((select string_agg(r.name, ',') from app.sys_role r
                                 join app.sys_user_role ur on ur.role_id=r.id where ur.user_id=u.id), '') as role_names,
                       coalesce((select string_agg(r.id::text, ',') from app.sys_role r
                                 join app.sys_user_role ur on ur.role_id=r.id where ur.user_id=u.id), '') as role_ids
                from app.sys_user u left join app.sys_dept d on d.id=u.dept_id
                """ + where + " order by u.id limit ? offset ?", pageArgs.toArray());
        return Result.ok(new PageResult<>(total == null ? 0 : total, page, size, records));
    }

    @PostMapping
    @Transactional
    public Result<Long> create(@Valid @RequestBody UserBody body) {
        Perms.require(CurrentUser.require(), "system:system-user:create");
        Integer exists = jdbc.queryForObject("select count(1) from app.sys_user where username=?",
                Integer.class, body.username().trim());
        if (exists != null && exists > 0) {
            throw new ApiException(409, "账号已存在");
        }
        String password = body.password() == null || body.password().isBlank() ? "Demo@123" : body.password();
        Long id = jdbc.queryForObject("""
                insert into app.sys_user(username,password_hash,nickname,dept_id,phone,email,status,created_by,updated_by)
                values (?,?,?,?,?,?,?,'admin','admin') returning id
                """, Long.class, body.username().trim(), passwordEncoder.encode(password), body.nickname(),
                body.deptId(), body.phone(), body.email(),
                body.status() == null || body.status().isBlank() ? "启用" : body.status());
        bindRoles(id, body.roleIds());
        return Result.ok(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public Result<Void> update(@PathVariable long id, @Valid @RequestBody UserBody body) {
        Perms.require(CurrentUser.require(), "system:system-user:update");
        Integer exists = jdbc.queryForObject(
                "select count(1) from app.sys_user where username=? and id<>? and deleted=0",
                Integer.class, body.username().trim(), id);
        if (exists != null && exists > 0) {
            throw new ApiException(409, "账号已存在");
        }
        int updated = jdbc.update("""
                update app.sys_user set username=?, nickname=?, dept_id=?, phone=?, email=?, status=?,
                       updated_by=?, updated_at=now(), version=version+1
                where id=? and deleted=0
                """, body.username().trim(), body.nickname(), body.deptId(), body.phone(), body.email(),
                body.status(), CurrentUser.require().username(), id);
        if (updated == 0) {
            throw new ApiException(404, "用户不存在");
        }
        if (body.roleIds() != null) {
            bindRoles(id, body.roleIds());
            sessionStore.kick(id, 7200);
        }
        return Result.ok();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public Result<Void> delete(@PathVariable long id) {
        AuthPrincipal current = CurrentUser.require();
        Perms.require(current, "system:system-user:delete");
        if (id == current.userId()) {
            throw new ApiException(400, "不能删除当前登录账号");
        }
        Map<String, Object> row = jdbc.queryForMap("select username from app.sys_user where id=? and deleted=0", id);
        if ("admin".equals(row.get("username"))) {
            throw new ApiException(400, "内置管理员不可删除");
        }
        jdbc.update("update app.sys_user set deleted=1, updated_at=now() where id=?", id);
        jdbc.update("delete from app.sys_user_role where user_id=?", id);
        sessionStore.kick(id, 7200);
        return Result.ok();
    }

    @PutMapping("/{id}/status")
    @Transactional
    public Result<Void> changeStatus(@PathVariable long id, @Valid @RequestBody StatusBody body) {
        Perms.require(CurrentUser.require(), "system:system-user:update");
        jdbc.update("update app.sys_user set status=?, updated_at=now() where id=? and deleted=0",
                body.status(), id);
        sessionStore.kick(id, 7200);
        return Result.ok();
    }

    @PostMapping("/{id}/reset-password")
    @Transactional
    public Result<Void> resetPassword(@PathVariable long id, @Valid @RequestBody PasswordBody body) {
        Perms.require(CurrentUser.require(), "system:system-user:reset");
        if (body.password().length() < 6) {
            throw new ApiException(400, "密码至少 6 位");
        }
        jdbc.update("update app.sys_user set password_hash=?, fail_count=0, locked_until=null, updated_at=now() where id=?",
                passwordEncoder.encode(body.password()), id);
        sessionStore.kick(id, 7200);
        return Result.ok();
    }

    @PostMapping("/{id}/kick")
    public Result<Void> kick(@PathVariable long id) {
        Perms.require(CurrentUser.require(), "system:system-user:kick");
        sessionStore.kick(id, 7200);
        return Result.ok();
    }

    @GetMapping("/{id}/roles")
    public Result<List<Long>> roles(@PathVariable long id) {
        Perms.require(CurrentUser.require(), "system:system-user:list");
        return Result.ok(jdbc.queryForList("select role_id from app.sys_user_role where user_id=?", Long.class, id));
    }

    @PutMapping("/{id}/roles")
    @Transactional
    public Result<Void> bindRolesApi(@PathVariable long id, @RequestBody RoleIdsBody body) {
        Perms.require(CurrentUser.require(), "system:system-user:assign");
        bindRoles(id, body.roleIds());
        sessionStore.kick(id, 7200);
        return Result.ok();
    }

    private void bindRoles(long userId, List<Long> roleIds) {
        jdbc.update("delete from app.sys_user_role where user_id=?", userId);
        if (roleIds != null) {
            for (Long roleId : roleIds) {
                jdbc.update("insert into app.sys_user_role(user_id,role_id) values (?,?) on conflict do nothing",
                        userId, roleId);
            }
        }
    }

    @GetMapping("/options")
    public Result<Map<String, Object>> options() {
        Perms.require(CurrentUser.require(), "system:system-user:list");
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("roles", jdbc.queryForList("select id, code, name from app.sys_role where deleted=0 order by id"));
        body.put("depts", jdbc.queryForList("select id, parent_id, name from app.sys_dept where deleted=0 order by sort,id"));
        return Result.ok(body);
    }
}
