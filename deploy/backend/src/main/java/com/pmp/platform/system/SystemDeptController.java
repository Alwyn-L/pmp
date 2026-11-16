package com.pmp.platform.system;

import com.pmp.platform.auth.CurrentUser;
import com.pmp.platform.common.ApiException;
import com.pmp.platform.common.Perms;
import com.pmp.platform.common.Result;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** 部门管理：树形维护，维护 ancestors 以支撑按部门及下级的数据权限。 */
@RestController
@RequestMapping("/api/v1/system/depts")
public class SystemDeptController {

    private final JdbcTemplate jdbc;

    public SystemDeptController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public record DeptBody(Long parentId, String name, Integer sort, String status) {
    }

    @GetMapping("/tree")
    public Result<List<Map<String, Object>>> tree() {
        Perms.require(CurrentUser.require(), "system:system-dept:list");
        List<Map<String, Object>> rows = jdbc.queryForList(
                "select * from app.sys_dept where deleted=0 order by sort,id");
        Map<Long, Map<String, Object>> nodes = new LinkedHashMap<>();
        for (Map<String, Object> row : rows) {
            Map<String, Object> node = new LinkedHashMap<>(row);
            node.put("children", new ArrayList<Map<String, Object>>());
            nodes.put(((Number) row.get("id")).longValue(), node);
        }
        List<Map<String, Object>> roots = new ArrayList<>();
        for (Map<String, Object> node : nodes.values()) {
            long parentId = ((Number) node.get("parent_id")).longValue();
            Map<String, Object> parent = nodes.get(parentId);
            if (parent == null || parentId == 0) {
                roots.add(node);
            } else {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> children = (List<Map<String, Object>>) parent.get("children");
                children.add(node);
            }
        }
        return Result.ok(roots);
    }

    @PostMapping
    @Transactional
    public Result<Long> create(@RequestBody DeptBody body) {
        Perms.require(CurrentUser.require(), "system:system-dept:create");
        if (body.name() == null || body.name().isBlank()) {
            throw new ApiException(400, "部门名称不能为空");
        }
        long parentId = body.parentId() == null ? 0 : body.parentId();
        String ancestors = ancestorsOf(parentId);
        Long id = jdbc.queryForObject("""
                insert into app.sys_dept(parent_id,ancestors,name,sort,status,created_by,updated_by)
                values (?,?,?,?,?,?,?) returning id
                """, Long.class, parentId, ancestors, body.name().trim(),
                body.sort() == null ? 0 : body.sort(),
                body.status() == null ? "启用" : body.status(),
                CurrentUser.require().username(), CurrentUser.require().username());
        return Result.ok(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public Result<Void> update(@PathVariable long id, @RequestBody DeptBody body) {
        Perms.require(CurrentUser.require(), "system:system-dept:update");
        long parentId = body.parentId() == null ? 0 : body.parentId();
        if (parentId == id) {
            throw new ApiException(400, "上级部门不能是自己");
        }
        String oldAncestors = jdbc.queryForObject(
                "select ancestors from app.sys_dept where id=? and deleted=0", String.class, id);
        String newAncestors = ancestorsOf(parentId);
        jdbc.update("update app.sys_dept set parent_id=?, ancestors=?, name=?, sort=?, status=?, updated_at=now() where id=?",
                parentId, newAncestors, body.name(), body.sort() == null ? 0 : body.sort(),
                body.status() == null ? "启用" : body.status(), id);
        // 同步子部门 ancestors 前缀
        String oldPrefix = oldAncestors + "," + id;
        String newPrefix = newAncestors + "," + id;
        jdbc.update("update app.sys_dept set ancestors=? || substring(ancestors from ?) where ancestors like ?",
                newPrefix, oldPrefix.length() + 1, oldPrefix + "%");
        return Result.ok();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public Result<Void> delete(@PathVariable long id) {
        Perms.require(CurrentUser.require(), "system:system-dept:delete");
        Integer children = jdbc.queryForObject(
                "select count(1) from app.sys_dept where parent_id=? and deleted=0", Integer.class, id);
        if (children != null && children > 0) {
            throw new ApiException(409, "存在子部门，请先删除子节点");
        }
        Integer users = jdbc.queryForObject(
                "select count(1) from app.sys_user where dept_id=? and deleted=0", Integer.class, id);
        if (users != null && users > 0) {
            throw new ApiException(409, "部门下仍有用户，无法删除");
        }
        jdbc.update("update app.sys_dept set deleted=1, updated_at=now() where id=?", id);
        return Result.ok();
    }

    private String ancestorsOf(long parentId) {
        if (parentId == 0) {
            return "0";
        }
        List<String> rows = jdbc.queryForList(
                "select ancestors from app.sys_dept where id=? and deleted=0", String.class, parentId);
        if (rows.isEmpty()) {
            throw new ApiException(400, "上级部门不存在");
        }
        return rows.get(0) + "," + parentId;
    }
}
