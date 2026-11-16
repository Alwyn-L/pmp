package com.pmp.platform.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/** JWT 认证过滤器：校验签名、有效期、会话存在性与异地登录踢出标记。 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final SessionStore sessionStore;
    private final ObjectMapper objectMapper;

    public JwtAuthFilter(JwtService jwtService, SessionStore sessionStore, ObjectMapper objectMapper) {
        this.jwtService = jwtService;
        this.sessionStore = sessionStore;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }
        Map<String, Object> payload = jwtService.verify(header.substring(7));
        if (payload == null || !"access".equals(payload.get("typ"))) {
            writeError(response, 401, "UNAUTHORIZED", "登录凭证无效或已过期");
            return;
        }
        String sid = (String) payload.get("sid");
        AuthPrincipal principal = sessionStore.session(sid);
        if (principal == null) {
            boolean kicked = sessionStore.isKicked(sid);
            writeError(response, 401, kicked ? "KICKED" : "UNAUTHORIZED",
                    kicked ? "账号已在其他设备登录，当前会话已失效" : "会话已失效，请重新登录");
            return;
        }
        List<SimpleGrantedAuthority> authorities = principal.perms().stream()
                .map(SimpleGrantedAuthority::new).toList();
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(principal, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        try {
            chain.doFilter(request, response);
        } finally {
            SecurityContextHolder.clearContext();
        }
    }

    private void writeError(HttpServletResponse response, int code, String state, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(Map.of(
                "code", code, "msg", message, "state", state, "data", "")));
    }
}
