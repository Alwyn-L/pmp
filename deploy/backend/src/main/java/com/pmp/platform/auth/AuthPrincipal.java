package com.pmp.platform.auth;

import java.util.List;

/** 请求上下文中的登录用户。 */
public record AuthPrincipal(
        long userId,
        String username,
        String nickname,
        Long deptId,
        List<String> roles,
        List<String> perms,
        String dataScope,
        String sid
) {
    public boolean isAdmin() {
        return roles != null && roles.contains("admin");
    }
}
