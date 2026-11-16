package com.pmp.platform.common;

/** 业务异常，携带响应码与提示信息。 */
public class ApiException extends RuntimeException {

    private final int code;

    public ApiException(String message) {
        this(400, message);
    }

    public ApiException(int code, String message) {
        super(message);
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
