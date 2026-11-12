package com.pmp.platform.api;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

/**
 * 平台基线接口：用于容器化部署后的链路连通性验证。
 * 业务接口可按领域在此包下独立分组，避免把诊断接口与业务接口混在一起。
 */
@RestController
@RequestMapping("/api/v1")
public class PlatformController {

    private final JdbcTemplate jdbcTemplate;
    private final StringRedisTemplate redisTemplate;
    private final Environment environment;
    private final HttpClient httpClient;

    @Value("${app.kafka.bootstrap}")
    private String kafkaBootstrap;

    @Value("${app.minio.endpoint}")
    private String minioEndpoint;

    @Value("${app.minio.bucket}")
    private String minioBucket;

    public PlatformController(JdbcTemplate jdbcTemplate,
                              StringRedisTemplate redisTemplate,
                              Environment environment) {
        this.jdbcTemplate = jdbcTemplate;
        this.redisTemplate = redisTemplate;
        this.environment = environment;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(2))
                .build();
    }

    /** 存活探针：进程可用即返回 ok。 */
    @GetMapping("/ping")
    public Map<String, Object> ping() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "ok");
        body.put("service", "pmp-backend");
        body.put("timestamp", now());
        return body;
    }

    /** 运行时元数据：环境、配置档案、版本与时区，便于排障确认部署标识。 */
    @GetMapping("/meta")
    public Map<String, Object> meta() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("service", "pmp-backend");
        body.put("version", version());
        body.put("env", environment.getProperty("app.env", "prod"));
        body.put("profiles", String.join(",", environment.getActiveProfiles()));
        body.put("java", System.getProperty("java.version"));
        body.put("timezone", TimeZone.getDefault().getID());
        body.put("minio_bucket", minioBucket);
        body.put("timestamp", now());
        return body;
    }

    /**
     * 依赖连通性：一次性探测 PostgreSQL / Redis / Kafka / MinIO。
     * 单项失败不抛错，返回 DEGRADED 与失败原因，便于部署验证脚本定位断点。
     */
    @GetMapping("/dependencies")
    public Map<String, Object> dependencies() {
        Map<String, Object> items = new LinkedHashMap<>();
        items.put("postgres", probe("postgres", () ->
                "select 1 -> " + jdbcTemplate.queryForObject("select 1", Integer.class)));
        items.put("redis", probe("redis", this::probeRedis));
        items.put("kafka", probe("kafka", this::probeKafka));
        items.put("minio", probe("minio", this::probeMinio));

        boolean allUp = items.values().stream()
                .allMatch(v -> "up".equals(((Map<?, ?>) v).get("status")));

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("overall", allUp ? "UP" : "DEGRADED");
        body.put("dependencies", items);
        body.put("timestamp", now());
        return body;
    }

    /**
     * 部署自检数据：读取初始化脚本写入的 app.deploy_check。
     * 用于验证「服务重启后持久化数据不丢失」。
     */
    @GetMapping("/checks")
    public Map<String, Object> checks() {
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(
                "select check_key, check_value, created_at from app.deploy_check order by check_key");
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("count", rows.size());
        body.put("items", rows);
        body.put("timestamp", now());
        return body;
    }

    private String probeRedis() {
        RedisConnection connection = null;
        try {
            connection = redisTemplate.getConnectionFactory().getConnection();
            return "PING -> " + connection.ping();
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    private String probeKafka() throws Exception {
        Properties props = new Properties();
        props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBootstrap);
        props.put(AdminClientConfig.REQUEST_TIMEOUT_MS_CONFIG, "3000");
        props.put(AdminClientConfig.DEFAULT_API_TIMEOUT_MS_CONFIG, "3000");
        try (AdminClient admin = AdminClient.create(props)) {
            int brokers = admin.describeCluster().nodes().get(3, TimeUnit.SECONDS).size();
            return "bootstrap=" + kafkaBootstrap + ", brokers=" + brokers;
        }
    }

    private String probeMinio() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(minioEndpoint + "/minio/health/live"))
                .timeout(Duration.ofSeconds(2))
                .GET()
                .build();
        HttpResponse<Void> response = httpClient.send(request, HttpResponse.BodyHandlers.discarding());
        if (response.statusCode() != 200) {
            throw new IllegalStateException("HTTP " + response.statusCode());
        }
        return "endpoint=" + minioEndpoint + ", bucket=" + minioBucket;
    }

    private Map<String, Object> probe(String name, ThrowingSupplier<String> action) {
        long start = System.nanoTime();
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("name", name);
        try {
            result.put("detail", action.get());
            result.put("status", "up");
        } catch (Exception ex) {
            result.put("status", "down");
            result.put("error", ex.getClass().getSimpleName() + ": " + rootMessage(ex));
        }
        result.put("latency_ms", (System.nanoTime() - start) / 1_000_000);
        return result;
    }

    private String rootMessage(Throwable throwable) {
        Throwable current = throwable;
        while (current.getCause() != null && current.getCause() != current) {
            current = current.getCause();
        }
        String message = current.getMessage();
        return message == null ? current.getClass().getSimpleName() : message;
    }

    private String version() {
        String version = getClass().getPackage().getImplementationVersion();
        return version == null ? "dev" : version;
    }

    private String now() {
        return OffsetDateTime.now(ZoneOffset.UTC).toString();
    }

    @FunctionalInterface
    private interface ThrowingSupplier<T> {
        T get() throws Exception;
    }
}
