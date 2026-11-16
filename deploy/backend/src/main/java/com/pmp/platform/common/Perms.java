package com.pmp.platform.common;

import com.pmp.platform.auth.AuthPrincipal;

/** 权限断言。 */
public final class Perms {

    private Perms() {
    }

    public static void require(AuthPrincipal user, String perm) {
        if (user == null) {
            throw new ApiException(401, "未登录");
        }
        if (!user.perms().contains(perm)) {
            throw new ApiException(403, "无权限执行该操作");
        }
    }
}
