package com.pmp.platform.biz;

import com.pmp.platform.auth.AuthPrincipal;
import com.pmp.platform.common.ApiException;
import com.pmp.platform.common.PageResult;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

/**
 * 通用业务 CRUD：所有字段均为白名单列并加引号，杜绝 SQL 注入；
 * 分页、关键字、多条件筛选、软删除、批量删除、数据权限、乐观锁、CSV 导出在此统一实现。
 */
@Service
public class BizCrudService {

    private static final Set<String> COMMON = Set.of("id", "code", "dept_id", "created_by", "created_at",
            "updated_by", "updated_at", "deleted", "version");
    private static final DateTimeFormatter DAY = DateTimeFormatter.ofPattern("yyyyMMdd");

    private final JdbcTemplate jdbc;

    public BizCrudService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public PageResult<Map<String, Object>> list(BizCatalog.TableMeta meta, AuthPrincipal user,
                                                int page, int size, String keyword,
                                                Map<String, String> filters, String dateFrom, String dateTo) {
        requirePerm(user, meta.pageId(), "list");
        int safePage = Math.max(1, page);
        int safeSize = Math.min(Math.max(1, size), 200);

        StringBuilder where = new StringBuilder(" where deleted=0");
        List<Object> args = new ArrayList<>();
        appendDataScope(where, args, user);
        appendKeyword(where, args, meta, keyword);
        appendFilters(where, args, meta, filters);
        appendDateRange(where, args, dateFrom, dateTo);

        Long total = jdbc.queryForObject("select count(1) from app." + meta.table() + where, Long.class, args.toArray());
        List<Object> pageArgs = new ArrayList<>(args);
        pageArgs.add(safeSize);
        pageArgs.add((long) (safePage - 1) * safeSize);
        List<Map<String, Object>> records = jdbc.queryForList(
                "select " + selectList(meta) + " from app." + meta.table() + where
                        + " order by created_at desc nulls last, id desc limit ? offset ?", pageArgs.toArray());
        return new PageResult<>(total == null ? 0 : total, safePage, safeSize, records);
    }

    public Map<String, Object> detail(BizCatalog.TableMeta meta, AuthPrincipal user, long id) {
        requirePerm(user, meta.pageId(), "list");
        StringBuilder where = new StringBuilder(" where id=? and deleted=0");
        List<Object> args = new ArrayList<>();
        args.add(id);
        appendDataScope(where, args, user);
        List<Map<String, Object>> rows = jdbc.queryForList(
                "select " + selectList(meta) + " from app." + meta.table() + where, args.toArray());
        if (rows.isEmpty()) {
            throw new ApiException(404, "数据不存在或无权查看");
        }
        return rows.get(0);
    }

    @Transactional
    public Map<String, Object> create(BizCatalog.TableMeta meta, AuthPrincipal user, Map<String, Object> payload) {
        requirePerm(user, meta.pageId(), "create");
        Map<String, Object> values = sanitize(meta, payload);
        String code = str(values.get("code"));
        if (code == null) {
            code = generatedCode(meta.pageId());
            values.put("code", code);
        }
        List<String> cols = new ArrayList<>();
        List<Object> args = new ArrayList<>();
        cols.add("code");
        args.add(code);
        cols.add("dept_id");
        args.add(user.deptId());
        cols.add("created_by");
        args.add(user.username());
        cols.add("updated_by");
        args.add(user.username());
        for (Map.Entry<String, Object> e : values.entrySet()) {
            if ("code".equals(e.getKey())) {
                continue;
            }
            cols.add(quote(e.getKey()));
            args.add(e.getValue());
        }
        String placeholders = String.join(",", cols.stream().map(c -> c.startsWith("\"") ? "?" : "?").toList());
        StringBuilder sql = new StringBuilder("insert into app." + meta.table() + " (");
        sql.append(String.join(",", cols.stream().map(c -> c.startsWith("\"") ? c : c).toList()));
        sql.append(") values (").append(placeholders).append(") returning id");
        Long id = jdbc.queryForObject(sql.toString(), Long.class, args.toArray());
        return detail(meta, user, id);
    }

    @Transactional
    public Map<String, Object> update(BizCatalog.TableMeta meta, AuthPrincipal user, long id, Map<String, Object> payload) {
        requirePerm(user, meta.pageId(), "update");
        Map<String, Object> values = sanitize(meta, payload);
        Object version = payload.get("version");
        StringBuilder sql = new StringBuilder("update app." + meta.table() + " set updated_by=?, updated_at=now(), version=version+1");
        List<Object> args = new ArrayList<>();
        args.add(user.username());
        for (Map.Entry<String, Object> e : values.entrySet()) {
            sql.append(", ").append(quote(e.getKey())).append("=?");
            args.add(e.getValue());
        }
        sql.append(" where id=? and deleted=0");
        args.add(id);
        if (version != null) {
            sql.append(" and version=?");
            args.add(Integer.parseInt(String.valueOf(version)));
        }
        int updated = jdbc.update(sql.toString(), args.toArray());
        if (updated == 0) {
            throw new ApiException(409, "数据已被他人修改或无权操作，请刷新后重试");
        }
        return detail(meta, user, id);
    }

    @Transactional
    public void delete(BizCatalog.TableMeta meta, AuthPrincipal user, long id) {
        requirePerm(user, meta.pageId(), "delete");
        int updated = jdbc.update("update app." + meta.table()
                + " set deleted=1, updated_by=?, updated_at=now() where id=? and deleted=0", user.username(), id);
        if (updated == 0) {
            throw new ApiException(404, "数据不存在或已删除");
        }
    }

    @Transactional
    public int batchDelete(BizCatalog.TableMeta meta, AuthPrincipal user, List<Long> ids) {
        requirePerm(user, meta.pageId(), "delete");
        if (ids == null || ids.isEmpty()) {
            throw new ApiException(400, "请选择要删除的数据");
        }
        if (ids.size() > 500) {
            throw new ApiException(400, "单次最多删除 500 条");
        }
        StringBuilder sql = new StringBuilder("update app." + meta.table()
                + " set deleted=1, updated_by=?, updated_at=now() where deleted=0 and id in (");
        List<Object> args = new ArrayList<>();
        args.add(user.username());
        for (int i = 0; i < ids.size(); i++) {
            sql.append(i == 0 ? "?" : ",?");
            args.add(ids.get(i));
        }
        sql.append(")");
        return jdbc.update(sql.toString(), args.toArray());
    }

    public byte[] export(BizCatalog.TableMeta meta, AuthPrincipal user, String keyword,
                         Map<String, String> filters, String dateFrom, String dateTo) {
        requirePerm(user, meta.pageId(), "export");
        StringBuilder where = new StringBuilder(" where deleted=0");
        List<Object> args = new ArrayList<>();
        appendDataScope(where, args, user);
        appendKeyword(where, args, meta, keyword);
        appendFilters(where, args, meta, filters);
        appendDateRange(where, args, dateFrom, dateTo);
        List<Map<String, Object>> rows = jdbc.queryForList(
                "select " + selectList(meta) + " from app." + meta.table() + where
                        + " order by id desc limit 50000", args.toArray());

        StringBuilder csv = new StringBuilder("\uFEFF");
        csv.append("ID,单号");
        for (BizCatalog.ColumnMeta c : meta.columns()) {
            csv.append(',').append(csvCell(c.label()));
        }
        csv.append(",创建人,创建时间\n");
        for (Map<String, Object> row : rows) {
            csv.append(value(row.get("id"))).append(',').append(csvCell(value(row.get("code"))));
            for (BizCatalog.ColumnMeta c : meta.columns()) {
                csv.append(',').append(csvCell(value(row.get(c.key()))));
            }
            csv.append(',').append(csvCell(value(row.get("created_by"))))
                    .append(',').append(csvCell(value(row.get("created_at")))).append('\n');
        }
        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    private String selectList(BizCatalog.TableMeta meta) {
        List<String> cols = new ArrayList<>(List.of("id", "code", "dept_id", "created_by", "created_at",
                "updated_by", "updated_at", "version"));
        for (BizCatalog.ColumnMeta c : meta.columns()) {
            if (!COMMON.contains(c.key())) {
                cols.add(quote(c.key()));
            }
        }
        return String.join(",", cols);
    }

    private void appendKeyword(StringBuilder where, List<Object> args, BizCatalog.TableMeta meta, String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return;
        }
        List<String> search = meta.searchColumns().isEmpty()
                ? meta.columns().stream().map(BizCatalog.ColumnMeta::key).limit(3).toList()
                : meta.searchColumns();
        where.append(" and (code ilike ?");
        args.add("%" + keyword.trim() + "%");
        for (String col : search) {
            where.append(" or ").append(quote(col)).append(" ilike ?");
            args.add("%" + keyword.trim() + "%");
        }
        where.append(")");
    }

    private void appendFilters(StringBuilder where, List<Object> args, BizCatalog.TableMeta meta,
                               Map<String, String> filters) {
        if (filters == null) {
            return;
        }
        for (Map.Entry<String, String> e : filters.entrySet()) {
            if (e.getValue() == null || e.getValue().isBlank() || "全部".equals(e.getValue())) {
                continue;
            }
            boolean allowed = "code".equals(e.getKey()) || "created_by".equals(e.getKey())
                    || meta.columns().stream().anyMatch(c -> c.key().equals(e.getKey()));
            if (!allowed) {
                throw new ApiException(400, "非法筛选字段: " + e.getKey());
            }
            where.append(" and ").append(quote(e.getKey())).append(" = ?");
            args.add(e.getValue());
        }
    }

    private void appendDateRange(StringBuilder where, List<Object> args, String from, String to) {
        if (from != null && !from.isBlank()) {
            where.append(" and created_at >= ?");
            args.add(Timestamp.valueOf(LocalDate.parse(from).atStartOfDay()));
        }
        if (to != null && !to.isBlank()) {
            where.append(" and created_at < ?");
            args.add(Timestamp.valueOf(LocalDate.parse(to).plusDays(1).atStartOfDay()));
        }
    }

    private void appendDataScope(StringBuilder where, List<Object> args, AuthPrincipal user) {
        String scope = user.dataScope() == null ? "SELF" : user.dataScope();
        switch (scope) {
            case "ALL" -> { }
            case "DEPT" -> {
                if (user.deptId() == null) {
                    where.append(" and 1=0");
                } else {
                    where.append(" and dept_id = ?");
                    args.add(user.deptId());
                }
            }
            case "DEPT_AND_CHILD" -> {
                if (user.deptId() == null) {
                    where.append(" and 1=0");
                } else {
                    where.append(" and (dept_id = ? or dept_id in (select id from app.sys_dept where deleted=0 and ancestors like ?))");
                    args.add(user.deptId());
                    args.add("%," + user.deptId() + "%");
                }
            }
            case "CUSTOM" -> {
                where.append(" and dept_id in (select rd.dept_id from app.sys_role_dept rd"
                        + " join app.sys_user_role ur on ur.role_id = rd.role_id where ur.user_id = ?)");
                args.add(user.userId());
            }

            default -> {
                where.append(" and created_by = ?");
                args.add(user.username());
            }
        }
    }

    private Map<String, Object> sanitize(BizCatalog.TableMeta meta, Map<String, Object> payload) {
        if (payload == null) {
            throw new ApiException(400, "请求体不能为空");
        }
        Map<String, Object> values = new LinkedHashMap<>();
        for (Map.Entry<String, Object> e : payload.entrySet()) {
            if (COMMON.contains(e.getKey()) && !"code".equals(e.getKey())) {
                continue;
            }
            boolean allowed = "code".equals(e.getKey())
                    || meta.columns().stream().anyMatch(c -> c.key().equals(e.getKey()));
            if (!allowed) {
                throw new ApiException(400, "非法字段: " + e.getKey());
            }
            String text = e.getValue() == null ? null : String.valueOf(e.getValue()).trim();
            values.put(e.getKey(), text == null || text.isEmpty() ? null : text);
        }
        return values;
    }

    private void requirePerm(AuthPrincipal user, String pageId, String action) {
        if (user == null) {
            throw new ApiException(401, "未登录");
        }
        if (!user.perms().contains("biz:" + pageId + ":" + action)) {
            throw new ApiException(403, "无权限执行该操作");
        }
    }

    private String generatedCode(String pageId) {
        String initials = java.util.Arrays.stream(pageId.split("-"))
                .filter(s -> !s.isBlank())
                .map(s -> s.substring(0, 1).toUpperCase())
                .reduce("", String::concat);
        String date = LocalDateTime.now().format(DAY);
        int random = ThreadLocalRandom.current().nextInt(1000, 9999);
        return initials + "-" + date + "-" + random;
    }

    private String quote(String identifier) {
        return "\"" + identifier.replace("\"", "\"\"") + "\"";
    }

    private String str(Object o) {
        return o == null || String.valueOf(o).isBlank() ? null : String.valueOf(o);
    }

    private String value(Object o) {
        return o == null ? "" : String.valueOf(o);
    }

    private String csvCell(String text) {
        String safe = text == null ? "" : text.replace("\"", "\"\"");
        return "\"" + safe + "\"";
    }
}
