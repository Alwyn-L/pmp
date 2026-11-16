package com.pmp.platform.auth;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/** 当前登录用户工具。 */
@Component
public class CurrentUser {

    public static AuthPrincipal get() {
        Object principal = SecurityContextHolder.getContext().getAuthentication() == null
                ? null : SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal instanceof AuthPrincipal p ? p : null;
    }

    public static AuthPrincipal require() {
        AuthPrincipal p = get();
        if (p == null) {
            throw new com.pmp.platform.common.ApiException(401, "未登录或登录已过期");
        }
        return p;
    }
}
