package com.pmp.platform.common;

import org.slf4j.MDC;

/**
 * 统一响应：{code,msg,data,traceId}。code=0 表示成功。
 */
public record Result<T>(int code, String msg, T data, String traceId) {

    public static <T> Result<T> ok(T data) {
        return new Result<>(0, "ok", data, MDC.get("traceId"));
    }

    public static Result<Void> ok() {
        return new Result<>(0, "ok", null, MDC.get("traceId"));
    }

    public static <T> Result<T> fail(int code, String msg) {
        return new Result<>(code, msg, null, MDC.get("traceId"));
    }
}
