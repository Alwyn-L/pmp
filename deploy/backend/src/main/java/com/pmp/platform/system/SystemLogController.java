package com.pmp.platform.system;

import com.pmp.platform.auth.CurrentUser;
import com.pmp.platform.common.PageResult;
import com.pmp.platform.common.Perms;
import com.pmp.platform.common.Result;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/** 日志查询：登录日志与操作日志。 */
@RestController
@RequestMapping("/api/v1/system/logs")
public class SystemLogController {

    private final JdbcTemplate jdbc;

    public SystemLogController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/login")
    public Result<PageResult<Map<String, Object>>> login(@RequestParam(defaultValue = "1") int page,
                                                         @RequestParam(defaultValue = "10") int size,
                                                         @RequestParam(required = false) String username,
                                                         @RequestParam(required = false) String result) {
        Perms.require(CurrentUser.require(), "system:system-log:list");
        StringBuilder where = new StringBuilder(" where 1=1");
        List<Object> args = new ArrayList<>();
        if (username != null && !username.isBlank()) {
            where.append(" and username ilike ?");
            args.add("%" + username.trim() + "%");
        }
        if (result != null && !result.isBlank()) {
            where.append(" and result = ?");
            args.add(result);
        }
        Long total = jdbc.queryForObject("select count(1) from app.sys_login_log" + where, Long.class, args.toArray());
        List<Object> pageArgs = new ArrayList<>(args);
        pageArgs.add(size);
        pageArgs.add((long) (page - 1) * size);
        List<Map<String, Object>> records = jdbc.queryForList(
                "select * from app.sys_login_log" + where + " order by id desc limit ? offset ?", pageArgs.toArray());
        return Result.ok(new PageResult<>(total == null ? 0 : total, page, size, records));
    }

    @GetMapping("/oper")
    public Result<PageResult<Map<String, Object>>> oper(@RequestParam(defaultValue = "1") int page,
                                                        @RequestParam(defaultValue = "10") int size,
                                                        @RequestParam(required = false) String keyword) {
        Perms.require(CurrentUser.require(), "system:system-log:list");
        StringBuilder where = new StringBuilder(" where 1=1");
        List<Object> args = new ArrayList<>();
        if (keyword != null && !keyword.isBlank()) {
            where.append(" and (username ilike ? or module ilike ? or uri ilike ?)");
            for (int i = 0; i < 3; i++) {
                args.add("%" + keyword.trim() + "%");
            }
        }
        Long total = jdbc.queryForObject("select count(1) from app.sys_oper_log" + where, Long.class, args.toArray());
        List<Object> pageArgs = new ArrayList<>(args);
        pageArgs.add(size);
        pageArgs.add((long) (page - 1) * size);
        List<Map<String, Object>> records = jdbc.queryForList(
                "select * from app.sys_oper_log" + where + " order by id desc limit ? offset ?", pageArgs.toArray());
        return Result.ok(new PageResult<>(total == null ? 0 : total, page, size, records));
    }
}
