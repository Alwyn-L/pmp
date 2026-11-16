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
import java.util.List;
import java.util.Map;

/** 角色管理：唯一性校验、启停、菜单权限、数据权限、关联用户查询与解绑。 */
@RestController
@RequestMapping("/api/v1/system/roles")
public class SystemRoleController {

    private final JdbcTemplate jdbc;
    private final SessionStore sessionStore;

    public SystemRoleController(JdbcTemplate jdbc, SessionStore sessionStore) {
        this.jdbc = jdbc;
        this.sessionStore = sessionStore;
    }

    public record RoleBody(@NotBlank String code, @NotBlank String name, String dataScope,
                           String status, String remark) {
    }

    public record MenuIdsBody(List<Long> menuIds) {
    }

    public record DataScopeBody(@NotBlank String dataScope, List<Long> deptIds) {
    }

    @GetMapping
    public Result<PageResult<Map<String, Object>>> list(@RequestParam(defaultValue = "1") int page,
                                                        @RequestParam(defaultValue = "10") int size,
                                                        @RequestParam(required = false) String keyword,
                                                        @RequestParam(required = false) String status) {
        Perms.require(CurrentUser.require(), "system:system-role:list");
        StringBuilder where = new StringBuilder(" where deleted=0");
        List<Object> args = new ArrayList<>();
        if (keyword != null && !keyword.isBlank()) {
            where.append(" and (code ilike ? or name ilike ?)");
            args.add("%" + keyword.trim() + "%");
            args.add("%" + keyword.trim() + "%");
        }
        if (status != null && !status.isBlank()) {
            where.append(" and status = ?");
            args.add(status);
        }
        Long total = jdbc.queryForObject("select count(1) from app.sys_role" + where, Long.class, args.toArray());
        List<Object> pageArgs = new ArrayList<>(args);
        pageArgs.add(size);
        pageArgs.add((long) (page - 1) * size);
        List<Map<String, Object>> records = jdbc.queryForList("""
                select r.*, (select count(1) from app.sys_user_role ur where ur.role_id=r.id) as user_count,
                       (select count(1) from app.sys_role_menu rm where rm.role_id=r.id) as menu_count
                from app.sys_role r
                """ + where + " order by r.id limit ? offset ?", pageArgs.toArray());
        return Result.ok(new PageResult<>(total == null ? 0 : total, page, size, records));
    }

    @GetMapping("/all")
    public Result<List<Map<String, Object>>> all() {
        Perms.require(CurrentUser.require(), "system:system-role:list");
        return Result.ok(jdbc.queryForList("select id, code, name from app.sys_role where deleted=0 order by id"));
    }

    @PostMapping
    @Transactional
    public Result<Long> create(@Valid @RequestBody RoleBody body) {
        Perms.require(CurrentUser.require(), "system:system-role:create");
        assertUnique(body, -1);
        Long id = jdbc.queryForObject("""
                insert into app.sys_role(code,name,data_scope,status,remark,created_by,updated_by)
                values (?,?,?,?,?,?,?) returning id
                """, Long.class, body.code().trim(), body.name().trim(),
                scope(body.dataScope()), status(body.status()), body.remark(),
                CurrentUser.require().username(), CurrentUser.require().username());
        return Result.ok(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public Result<Void> update(@PathVariable long id, @Valid @RequestBody RoleBody body) {
        Perms.require(CurrentUser.require(), "system:system-role:update");
        assertUnique(body, id);
        int updated = jdbc.update("""
                update app.sys_role set code=?, name=?, data_scope=?, status=?, remark=?,
                       updated_by=?, updated_at=now(), version=version+1
                where id=? and deleted=0
                """, body.code().trim(), body.name().trim(), scope(body.dataScope()), status(body.status()),
                body.remark(), CurrentUser.require().username(), id);
        if (updated == 0) {
            throw new ApiException(404, "角色不存在");
        }
        kickRoleUsers(id);
        return Result.ok();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public Result<Void> delete(@PathVariable long id) {
        Perms.require(CurrentUser.require(), "system:system-role:delete");
        Map<String, Object> role = jdbc.queryForMap("select code from app.sys_role where id=? and deleted=0", id);
        if ("admin".equals(role.get("code"))) {
            throw new ApiException(400, "内置管理员角色不可删除");
        }
        Integer bound = jdbc.queryForObject("select count(1) from app.sys_user_role where role_id=?",
                Integer.class, id);
        if (bound != null && bound > 0) {
            throw new ApiException(409, "该角色仍关联 " + bound + " 个用户，请先解绑");
        }
        jdbc.update("update app.sys_role set deleted=1, updated_at=now() where id=?", id);
        jdbc.update("delete from app.sys_role_menu where role_id=?", id);
        jdbc.update("delete from app.sys_role_dept where role_id=?", id);
        return Result.ok();
    }

    @PutMapping("/{id}/status")
    @Transactional
    public Result<Void> changeStatus(@PathVariable long id, @RequestBody Map<String, String> body) {
        Perms.require(CurrentUser.require(), "system:system-role:update");
        jdbc.update("update app.sys_role set status=?, updated_at=now() where id=? and deleted=0",
                status(body.get("status")), id);
        kickRoleUsers(id);
        return Result.ok();
    }

    @GetMapping("/{id}/menus")
    public Result<List<Long>> menus(@PathVariable long id) {
        Perms.require(CurrentUser.require(), "system:system-role:list");
        return Result.ok(jdbc.queryForList("select menu_id from app.sys_role_menu where role_id=?", Long.class, id));
    }

    @PutMapping("/{id}/menus")
    @Transactional
    public Result<Void> bindMenus(@PathVariable long id, @RequestBody MenuIdsBody body) {
        Perms.require(CurrentUser.require(), "system:system-role:assign");
        Integer exists = jdbc.queryForObject("select count(1) from app.sys_role where id=? and deleted=0",
                Integer.class, id);
        if (exists == null || exists == 0) {
            throw new ApiException(404, "角色不存在");
        }
        jdbc.update("delete from app.sys_role_menu where role_id=?", id);
        if (body.menuIds() != null) {
            for (Long menuId : body.menuIds()) {
                jdbc.update("insert into app.sys_role_menu(role_id,menu_id) values (?,?) on conflict do nothing", id, menuId);
            }
        }
        kickRoleUsers(id);
        return Result.ok();
    }

    @PutMapping("/{id}/data-scope")
    @Transactional
    public Result<Void> dataScope(@PathVariable long id, @Valid @RequestBody DataScopeBody body) {
        Perms.require(CurrentUser.require(), "system:system-role:assign");
        jdbc.update("update app.sys_role set data_scope=?, updated_at=now() where id=? and deleted=0",
                body.dataScope(), id);
        jdbc.update("delete from app.sys_role_dept where role_id=?", id);
        if (body.deptIds() != null) {
            for (Long deptId : body.deptIds()) {
                jdbc.update("insert into app.sys_role_dept(role_id,dept_id) values (?,?) on conflict do nothing", id, deptId);
            }
        }
        kickRoleUsers(id);
        return Result.ok();
    }

    @GetMapping("/{id}/users")
    public Result<PageResult<Map<String, Object>>> users(@PathVariable long id,
                                                         @RequestParam(defaultValue = "1") int page,
                                                         @RequestParam(defaultValue = "10") int size) {
        Perms.require(CurrentUser.require(), "system:system-role:list");
        Long total = jdbc.queryForObject("""
                select count(1) from app.sys_user u join app.sys_user_role ur on ur.user_id=u.id
                where ur.role_id=? and u.deleted=0
                """, Long.class, id);
        List<Map<String, Object>> records = jdbc.queryForList("""
                select u.id, u.username, u.nickname, u.status from app.sys_user u
                join app.sys_user_role ur on ur.user_id=u.id
                where ur.role_id=? and u.deleted=0 order by u.id limit ? offset ?
                """, id, size, (long) (page - 1) * size);
        return Result.ok(new PageResult<>(total == null ? 0 : total, page, size, records));
    }

    @DeleteMapping("/{id}/users/{userId}")
    @Transactional
    public Result<Void> unbind(@PathVariable long id, @PathVariable long userId) {
        Perms.require(CurrentUser.require(), "system:system-role:assign");
        jdbc.update("delete from app.sys_user_role where role_id=? and user_id=?", id, userId);
        sessionStore.kick(userId, 7200);
        return Result.ok();
    }

    private void assertUnique(RoleBody body, long excludeId) {
        Integer byCode = jdbc.queryForObject(
                "select count(1) from app.sys_role where code=? and id<>? and deleted=0",
                Integer.class, body.code().trim(), excludeId);
        if (byCode != null && byCode > 0) {
            throw new ApiException(409, "角色编码已存在");
        }
        Integer byName = jdbc.queryForObject(
                "select count(1) from app.sys_role where name=? and id<>? and deleted=0",
                Integer.class, body.name().trim(), excludeId);
        if (byName != null && byName > 0) {
            throw new ApiException(409, "角色名称已存在");
        }
    }

    private void kickRoleUsers(long roleId) {
        List<Long> userIds = jdbc.queryForList(
                "select user_id from app.sys_user_role where role_id=?", Long.class, roleId);
        for (Long userId : userIds) {
            sessionStore.kick(userId, 7200);
        }
    }

    private String scope(String value) {
        return value == null || value.isBlank() ? "DEPT" : value;
    }

    private String status(String value) {
        return value == null || value.isBlank() ? "启用" : value;
    }

    @SuppressWarnings("unused")
    private AuthPrincipal current() {
        return CurrentUser.require();
    }
}
