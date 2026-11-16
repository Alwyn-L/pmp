package com.pmp.platform.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 初始账号保障：首次启动创建管理员与各角色演示账号。
 * 已存在则跳过，不会覆盖任何人为修改的密码。
 */
@Component
public class AccountInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AccountInitializer.class);

    private final JdbcTemplate jdbc;
    private final PasswordEncoder passwordEncoder;
    private final AuthProperties props;

    public AccountInitializer(JdbcTemplate jdbc, PasswordEncoder passwordEncoder, AuthProperties props) {
        this.jdbc = jdbc;
        this.passwordEncoder = passwordEncoder;
        this.props = props;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        ensure("admin", "系统管理员", 1L, "admin", props.getAdminPassword());
        Map<String, Object[]> demo = new LinkedHashMap<>();
        demo.put("exec", new Object[]{"高管演示", 1L, "exec"});
        demo.put("planner", new Object[]{"计划员演示", 3L, "planner"});
        demo.put("buyer", new Object[]{"采购员演示", 3L, "buyer"});
        demo.put("rd", new Object[]{"研发演示", 2L, "rd"});
        demo.put("wh", new Object[]{"仓管员演示", 3L, "wh"});
        demo.put("prod", new Object[]{"生产主管演示", 4L, "prod"});
        demo.put("fin", new Object[]{"财务演示", 5L, "fin"});
        demo.put("sales", new Object[]{"销售演示", 3L, "sales"});
        demo.put("mdm", new Object[]{"主数据演示", 3L, "mdm"});
        demo.put("audit", new Object[]{"审计演示", 1L, "audit"});
        demo.forEach((username, meta) ->
                ensure(username, (String) meta[0], (Long) meta[1], (String) meta[2], "Demo@123"));
    }

    private void ensure(String username, String nickname, Long deptId, String roleCode, String rawPassword) {
        Integer exists = jdbc.queryForObject(
                "select count(1) from app.sys_user where username=?", Integer.class, username);
        if (exists != null && exists > 0) {
            return;
        }
        Long roleId = jdbc.query("select id from app.sys_role where code=? and deleted=0",
                rs -> rs.next() ? rs.getLong(1) : null, roleCode);
        if (roleId == null) {
            log.warn("角色 {} 不存在，跳过账号 {} 初始化", roleCode, username);
            return;
        }
        Long userId = jdbc.queryForObject("""
                insert into app.sys_user(username,password_hash,nickname,dept_id,status,created_by,updated_by)
                values (?,?,?,?,'启用','system','system') returning id
                """, Long.class, username, passwordEncoder.encode(rawPassword), nickname, deptId);
        jdbc.update("insert into app.sys_user_role(user_id,role_id) values (?,?) on conflict do nothing",
                userId, roleId);
        log.info("初始化账号 {}（角色 {}）", username, roleCode);
    }
}
