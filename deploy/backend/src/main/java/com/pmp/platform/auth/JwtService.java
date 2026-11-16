package com.pmp.platform.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp.platform.common.ApiException;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 轻量 HS256 JWT 实现（无外部依赖）。
 * 载荷包含 sub/typ/sid/jti/exp，签名使用 app.auth.secret。
 */
@Service
public class JwtService {

    private static final Base64.Encoder ENCODER = Base64.getUrlEncoder().withoutPadding();
    private static final Base64.Decoder DECODER = Base64.getUrlDecoder();

    private final ObjectMapper objectMapper;
    private final byte[] key;

    public JwtService(ObjectMapper objectMapper, AuthProperties props) {
        this.objectMapper = objectMapper;
        this.key = props.getSecret().getBytes(StandardCharsets.UTF_8);
    }

    public String issue(long userId, String username, String sid, String type, long ttlSeconds) {
        Map<String, Object> header = Map.of("alg", "HS256", "typ", "JWT");
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("sub", String.valueOf(userId));
        payload.put("uname", username);
        payload.put("sid", sid);
        payload.put("typ", type);
        payload.put("jti", java.util.UUID.randomUUID().toString().replace("-", ""));
        payload.put("iat", Instant.now().getEpochSecond());
        payload.put("exp", Instant.now().getEpochSecond() + ttlSeconds);
        try {
            String head = ENCODER.encodeToString(objectMapper.writeValueAsBytes(header));
            String body = ENCODER.encodeToString(objectMapper.writeValueAsBytes(payload));
            return head + "." + body + "." + sign(head + "." + body);
        } catch (Exception ex) {
            throw new ApiException(500, "令牌签发失败");
        }
    }

    /** 校验签名与有效期，失败返回 null（由调用方决定 401）。 */
    @SuppressWarnings("unchecked")
    public Map<String, Object> verify(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                return null;
            }
            String expected = sign(parts[0] + "." + parts[1]);
            if (!MessageDigest.isEqual(expected.getBytes(StandardCharsets.UTF_8),
                    parts[2].getBytes(StandardCharsets.UTF_8))) {
                return null;
            }
            Map<String, Object> payload = objectMapper.readValue(DECODER.decode(parts[1]), Map.class);
            Number exp = (Number) payload.get("exp");
            if (exp == null || exp.longValue() < Instant.now().getEpochSecond()) {
                return null;
            }
            return payload;
        } catch (Exception ex) {
            return null;
        }
    }

    public long ttlOf(Map<String, Object> payload) {
        Number exp = (Number) payload.get("exp");
        return Math.max(0, exp.longValue() - Instant.now().getEpochSecond());
    }

    private String sign(String content) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(key, "HmacSHA256"));
        return ENCODER.encodeToString(mac.doFinal(content.getBytes(StandardCharsets.UTF_8)));
    }
}
