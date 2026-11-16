package com.pmp.platform.system;

import com.pmp.platform.auth.CurrentUser;
import com.pmp.platform.biz.BizCatalog;
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
import java.util.Set;
import java.util.regex.Pattern;

/** 菜单管理：树形增删改、拖拽排序、路由/组件合法性校验、隐藏与外链。 */
@RestController
@RequestMapping("/api/v1/system/menus")
public class SystemMenuController {

    private static final Pattern INTERNAL_PATH = Pattern.compile("^/[a-z0-9\\-/]*$");
    private static final Set<String> TYPES = Set.of("DIR", "MENU", "BUTTON", "LINK");
    private static final Set<String> SYSTEM_PAGES = Set.of(
            "system-user", "system-role", "system-menu", "system-dept", "system-log");

    private final JdbcTemplate jdbc;
    private final BizCatalog catalog;

    public SystemMenuController(JdbcTemplate jdbc, BizCatalog catalog) {
        this.jdbc = jdbc;
        this.catalog = catalog;
    }

    public record MenuBody(Long id, Long parentId, String name, String type, String path, String component,
                           String icon, String permCode, Integer sort, Integer visible, Integer external,
                           String status) {
    }

    public record SortItem(Long id, Long parentId, Integer sort) {
    }

    @GetMapping("/tree")
    public Result<List<Map<String, Object>>> tree() {
        Perms.require(CurrentUser.require(), "system:system-menu:list");
        return Result.ok(treeOf(jdbc.queryForList("select * from app.sys_menu where deleted=0 order by sort,id")));
    }

    @GetMapping("/{id}")
    public Result<Map<String, Object>> detail(@PathVariable long id) {
        Perms.require(CurrentUser.require(), "system:system-menu:list");
        return Result.ok(jdbc.queryForMap("select * from app.sys_menu where id=? and deleted=0", id));
    }

    @PostMapping
    @Transactional
    public Result<Long> create(@RequestBody MenuBody body) {
        Perms.require(CurrentUser.require(), "system:system-menu:create");
        validate(body, null);
        Long id = jdbc.queryForObject("""
                insert into app.sys_menu(parent_id,name,type,path,component,icon,perm_code,sort,visible,external,status,created_by,updated_by)
                values (?,?,?,?,?,?,?,?,?,?,?,?,?) returning id
                """, Long.class, parent(body.parentId()), body.name().trim(), body.type(),
                body.path(), body.component(), body.icon(), body.permCode(),
                body.sort() == null ? 0 : body.sort(), flag(body.visible(), 1),
                flag(body.external(), 0), body.status() == null ? "启用" : body.status(),
                CurrentUser.require().username(), CurrentUser.require().username());
        return Result.ok(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public Result<Void> update(@PathVariable long id, @RequestBody MenuBody body) {
        Perms.require(CurrentUser.require(), "system:system-menu:update");
        validate(body, id);
        if (body.parentId() != null && body.parentId() == id) {
            throw new ApiException(400, "上级菜单不能是自己");
        }
        if (body.parentId() != null && isDescendant(id, body.parentId())) {
            throw new ApiException(400, "上级菜单不能是自己的子节点");
        }
        jdbc.update("""
                update app.sys_menu set parent_id=?, name=?, type=?, path=?, component=?, icon=?, perm_code=?,
                       sort=?, visible=?, external=?, status=?, updated_by=?, updated_at=now(), version=version+1
                where id=? and deleted=0
                """, parent(body.parentId()), body.name().trim(), body.type(), body.path(), body.component(),
                body.icon(), body.permCode(), body.sort() == null ? 0 : body.sort(),
                flag(body.visible(), 1), flag(body.external(), 0),
                body.status() == null ? "启用" : body.status(), CurrentUser.require().username(), id);
        return Result.ok();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public Result<Void> delete(@PathVariable long id) {
        Perms.require(CurrentUser.require(), "system:system-menu:delete");
        Integer children = jdbc.queryForObject(
                "select count(1) from app.sys_menu where parent_id=? and deleted=0", Integer.class, id);
        if (children != null && children > 0) {
            throw new ApiException(409, "存在子菜单，请先删除子节点");
        }
        jdbc.update("update app.sys_menu set deleted=1, updated_at=now() where id=?", id);
        jdbc.update("delete from app.sys_role_menu where menu_id=?", id);
        return Result.ok();
    }

    @PutMapping("/sort")
    @Transactional
    public Result<Void> sort(@RequestBody List<SortItem> items) {
        Perms.require(CurrentUser.require(), "system:system-menu:update");
        if (items == null) {
            return Result.ok();
        }
        for (SortItem item : items) {
            if (item.id() == null) {
                continue;
            }
            jdbc.update("update app.sys_menu set parent_id=?, sort=? where id=?",
                    parent(item.parentId()), item.sort() == null ? 0 : item.sort(), item.id());
        }
        return Result.ok();
    }

    private void validate(MenuBody body, Long id) {
        if (body.name() == null || body.name().isBlank()) {
            throw new ApiException(400, "菜单名称不能为空");
        }
        if (body.type() == null || !TYPES.contains(body.type())) {
            throw new ApiException(400, "菜单类型非法");
        }
        boolean external = flag(body.external(), 0) == 1;
        String path = body.path();
        if (path != null && !path.isBlank()) {
            if (external) {
                if (!path.startsWith("http://") && !path.startsWith("https://")) {
                    throw new ApiException(400, "外链地址必须以 http(s):// 开头");
                }
            } else if (!INTERNAL_PATH.matcher(path).matches()) {
                throw new ApiException(400, "路由地址只允许小写字母、数字、中划线，且以 / 开头");
            }
        }
        if ("MENU".equals(body.type()) && !external) {
            if (path == null || path.isBlank()) {
                throw new ApiException(400, "页面菜单必须配置路由地址");
            }
            if (body.component() == null || body.component().isBlank()) {
                throw new ApiException(400, "页面菜单必须绑定组件");
            }
            boolean known = SYSTEM_PAGES.contains(body.component()) || isCatalogPage(body.component());
            if (!known) {
                throw new ApiException(400, "组件不存在: " + body.component());
            }
        }
        if ("DIR".equals(body.type()) && body.path() != null && !body.path().isBlank() && !external) {
            throw new ApiException(400, "目录菜单不应配置路由地址");
        }
        Integer dup = jdbc.queryForObject("""
                select count(1) from app.sys_menu
                where deleted=0 and name=? and parent_id=? and id<>?
                """, Integer.class, body.name().trim(), parent(body.parentId()), id == null ? -1 : id);
        if (dup != null && dup > 0) {
            throw new ApiException(409, "同级下已存在同名菜单");
        }
    }

    private boolean isCatalogPage(String component) {
        try {
            catalog.require(component);
            return true;
        } catch (ApiException ex) {
            return false;
        }
    }

    private boolean isDescendant(long ancestorId, long candidateId) {
        long cursor = candidateId;
        for (int i = 0; i < 12; i++) {
            List<Long> parents = jdbc.queryForList(
                    "select parent_id from app.sys_menu where id=? and deleted=0", Long.class, cursor);
            if (parents.isEmpty() || parents.get(0) == 0) {
                return false;
            }
            cursor = parents.get(0);
            if (cursor == ancestorId) {
                return true;
            }
        }
        return false;
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> treeOf(List<Map<String, Object>> rows) {
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
                ((List<Map<String, Object>>) parent.get("children")).add(node);
            }
        }
        return roots;
    }

    private long parent(Long parentId) {
        return parentId == null ? 0 : parentId;
    }

    private int flag(Integer value, int fallback) {
        return value == null ? fallback : value;
    }
}
