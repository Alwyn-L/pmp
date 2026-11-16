package com.pmp.platform.auth;

import com.pmp.platform.common.Result;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/** 认证接口：登录、刷新、登出、当前用户、菜单。 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public record LoginRequest(@NotBlank String username, @NotBlank String password) {
    }

    public record RefreshRequest(@NotBlank String refreshToken) {
    }

    @PostMapping("/login")
    public Result<Map<String, Object>> login(@Valid @RequestBody LoginRequest body, HttpServletRequest request) {
        return Result.ok(authService.login(body.username().trim(), body.password(), request));
    }

    @PostMapping("/refresh")
    public Result<Map<String, Object>> refresh(@Valid @RequestBody RefreshRequest body) {
        return Result.ok(authService.refresh(body.refreshToken()));
    }

    @PostMapping("/logout")
    public Result<Void> logout() {
        AuthPrincipal principal = CurrentUser.require();
        authService.logout(principal.sid());
        return Result.ok();
    }

    @GetMapping("/profile")
    public Result<Map<String, Object>> profile() {
        return Result.ok(authService.profile(CurrentUser.require()));
    }

    @GetMapping("/menus")
    public Result<List<Map<String, Object>>> menus() {
        return Result.ok(authService.menus(CurrentUser.require()));
    }
}