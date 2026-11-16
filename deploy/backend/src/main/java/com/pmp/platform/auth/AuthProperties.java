package com.pmp.platform.auth;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/** 认证与锁定策略配置。 */
@Component
@ConfigurationProperties(prefix = "app.auth")
public class AuthProperties {

    private String secret = "pmp-dev-secret-change-me-0123456789abcdef";
    private long accessTtlSeconds = 7200;
    private long refreshTtlSeconds = 604800;
    private boolean singleSession = true;
    private int failLimit = 5;
    private long failWindowSeconds = 900;
    private long lockSeconds = 1800;
    private String adminPassword = "Admin@123";

    public String getSecret() { return secret; }
    public void setSecret(String secret) { this.secret = secret; }
    public long getAccessTtlSeconds() { return accessTtlSeconds; }
    public void setAccessTtlSeconds(long v) { this.accessTtlSeconds = v; }
    public long getRefreshTtlSeconds() { return refreshTtlSeconds; }
    public void setRefreshTtlSeconds(long v) { this.refreshTtlSeconds = v; }
    public boolean isSingleSession() { return singleSession; }
    public void setSingleSession(boolean v) { this.singleSession = v; }
    public int getFailLimit() { return failLimit; }
    public void setFailLimit(int v) { this.failLimit = v; }
    public long getFailWindowSeconds() { return failWindowSeconds; }
    public void setFailWindowSeconds(long v) { this.failWindowSeconds = v; }
    public long getLockSeconds() { return lockSeconds; }
    public void setLockSeconds(long v) { this.lockSeconds = v; }
    public String getAdminPassword() { return adminPassword; }
    public void setAdminPassword(String v) { this.adminPassword = v; }
}
