package com.pmp.platform.common;

import java.util.List;

/** 分页结果。 */
public record PageResult<T>(long total, int page, int size, List<T> records) {
}
