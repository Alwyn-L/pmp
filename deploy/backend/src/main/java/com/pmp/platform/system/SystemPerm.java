package com.pmp.platform.system;

import com.pmp.platform.auth.AuthPrincipal;
import com.pmp.platform.common.ApiException;
import org.springframework.stereotype.Component;

import java.util.List;

/** 系统管理权限校验。 */
@Component
public class SystemPerm {

    public void require(AuthPrincipal user, String perm) {
        if (user == null) {
            throw new ApiException(401, "未登录");
        }
        if (!user.perms().contains(perm)) {
            throw new ApiException(403, "无权限执行该操作");
        }
    }

    public void requireAny(AuthPrincipal user, String... perms) {
        if (user == null) {
            throw new ApiException(401, "未登录");
        }
        if (List.of(perms).stream().noneMatch(user.perms()::contains)) {
            throw new ApiException(403, "无权限执行该操作");
        }
    }
}
