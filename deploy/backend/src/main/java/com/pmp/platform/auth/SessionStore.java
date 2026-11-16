package com.pmp.platform.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.Set;

/**
 * Redis 会话存储。
 * key 规划：pmp:auth:session:{sid} / pmp:auth:user:sessions:{uid} /
 *          pmp:auth:refresh:{jti} / pmp:auth:kicked:{sid} / pmp:auth:fail:{username}
 */
@Service
public class SessionStore {

    private final StringRedisTemplate redis;
    private final ObjectMapper objectMapper;

    public SessionStore(StringRedisTemplate redis, ObjectMapper objectMapper) {
        this.redis = redis;
        this.objectMapper = objectMapper;
    }

    public void createSession(String sid, AuthPrincipal principal, long ttlSeconds) {
        try {
            redis.opsForValue().set(key(sid), objectMapper.writeValueAsString(principal), Duration.ofSeconds(ttlSeconds));
            redis.opsForSet().add(userKey(principal.userId()), sid);
            redis.expire(userKey(principal.userId()), Duration.ofSeconds(ttlSeconds));
        } catch (Exception ex) {
            throw new com.pmp.platform.common.ApiException(500, "会话创建失败");
        }
    }

    public AuthPrincipal session(String sid) {
        String json = redis.opsForValue().get(key(sid));
        if (json == null) {
            return null;
        }
        try {
            return objectMapper.readValue(json, AuthPrincipal.class);
        } catch (Exception ex) {
            return null;
        }
    }

    public boolean isKicked(String sid) {
        return Boolean.TRUE.equals(redis.hasKey("pmp:auth:kicked:" + sid));
    }

    public void deleteSession(long userId, String sid) {
        redis.delete(key(sid));
        redis.opsForSet().remove(userKey(userId), sid);
    }

    public void kick(long userId, long accessTtlSeconds) {
        Set<String> sids = redis.opsForSet().members(userKey(userId));
        if (sids != null) {
            for (String sid : sids) {
                redis.delete(key(sid));
                redis.opsForValue().set("pmp:auth:kicked:" + sid, "1", Duration.ofSeconds(accessTtlSeconds));
            }
        }
        redis.delete(userKey(userId));
    }

    public List<String> sessions(long userId) {
        Set<String> sids = redis.opsForSet().members(userKey(userId));
        return sids == null ? List.of() : List.copyOf(sids);
    }

    public void putRefresh(String jti, String sid, long ttlSeconds) {
        redis.opsForValue().set("pmp:auth:refresh:" + jti, sid, Duration.ofSeconds(ttlSeconds));
    }

    public String takeRefresh(String jti) {
        String sid = redis.opsForValue().get("pmp:auth:refresh:" + jti);
        if (sid != null) {
            redis.delete("pmp:auth:refresh:" + jti);
        }
        return sid;
    }

    public long increaseFail(String username, long windowSeconds) {
        String key = "pmp:auth:fail:" + username;
        Long count = redis.opsForValue().increment(key);
        if (count != null && count == 1L) {
            redis.expire(key, Duration.ofSeconds(windowSeconds));
        }
        return count == null ? 0 : count;
    }

    public void clearFail(String username) {
        redis.delete("pmp:auth:fail:" + username);
    }

    private String key(String sid) {
        return "pmp:auth:session:" + sid;
    }

    private String userKey(long userId) {
        return "pmp:auth:user:sessions:" + userId;
    }
}
