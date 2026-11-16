package com.pmp.platform.system;

import com.pmp.platform.auth.AuthPrincipal;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** 菜单与权限加载：按角色过滤、构建树、展开按钮权限。 */
@Service
public class MenuService {

    private final JdbcTemplate jdbc;

    public MenuService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> userMenus(AuthPrincipal principal) {
        String sql = principal.isAdmin()
                ? "select * from app.sys_menu where deleted=0 and status='启用' order by sort,id"
                : """
                  select distinct m.* from app.sys_menu m
                  join app.sys_role_menu rm on rm.menu_id = m.id
                  join app.sys_user_role ur on ur.role_id = rm.role_id
                  where ur.user_id = ? and m.deleted=0 and m.status='启用'
                  order by m.sort, m.id
                  """;
        List<Map<String, Object>> rows = principal.isAdmin()
                ? jdbc.queryForList(sql)
                : jdbc.queryForList(sql, principal.userId());
        return tree(rows);
    }

    public List<String> perms(AuthPrincipal principal) {
        String sql = principal.isAdmin()
                ? "select perm_code from app.sys_menu where deleted=0 and status='启用' and perm_code is not null"
                : """
                  select distinct m.perm_code from app.sys_menu m
                  join app.sys_role_menu rm on rm.menu_id = m.id
                  join app.sys_user_role ur on ur.role_id = rm.role_id
                  where ur.user_id = ? and m.deleted=0 and m.status='启用' and m.perm_code is not null
                  """;
        List<String> codes = principal.isAdmin()
                ? jdbc.queryForList(sql, String.class)
                : jdbc.queryForList(sql, String.class, principal.userId());
        List<String> result = new ArrayList<>();
        for (String code : codes) {
            if (code == null || code.isBlank() || result.contains(code)) {
                continue;
            }
            result.add(code);
            if (code.endsWith(":list")) {
                String base = code.substring(0, code.length() - 5);
                for (String action : List.of("create", "update", "delete", "export")) {
                    add(result, base + ":" + action);
                }
                if (base.startsWith("system:system-user")) {
                    add(result, base + ":reset");
                    add(result, base + ":kick");
                    add(result, base + ":assign");
                }
                if (base.startsWith("system:system-role")) {
                    add(result, base + ":assign");
                }
            }
        }
        return result;
    }

    private void add(List<String> list, String code) {
        if (!list.contains(code)) {
            list.add(code);
        }
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> tree(List<Map<String, Object>> rows) {
        Map<Long, Map<String, Object>> nodes = new LinkedHashMap<>();
        for (Map<String, Object> row : rows) {
            Map<String, Object> node = new LinkedHashMap<>();
            node.put("id", row.get("id"));
            node.put("parentId", row.get("parent_id"));
            node.put("name", row.get("name"));
            node.put("type", row.get("type"));
            node.put("path", row.get("path"));
            node.put("component", row.get("component"));
            node.put("icon", row.get("icon"));
            node.put("permCode", row.get("perm_code"));
            node.put("sort", row.get("sort"));
            node.put("visible", row.get("visible"));
            node.put("external", row.get("external"));
            node.put("children", new ArrayList<Map<String, Object>>());
            nodes.put(((Number) row.get("id")).longValue(), node);
        }
        List<Map<String, Object>> roots = new ArrayList<>();
        for (Map<String, Object> node : nodes.values()) {
            long parentId = ((Number) node.get("parentId")).longValue();
            Map<String, Object> parent = nodes.get(parentId);
            if (parent == null || parentId == 0) {
                roots.add(node);
            } else {
                ((List<Map<String, Object>>) parent.get("children")).add(node);
            }
        }
        return roots;
    }
}
