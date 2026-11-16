package com.pmp.platform.biz;

import com.pmp.platform.auth.CurrentUser;
import com.pmp.platform.common.ApiException;
import com.pmp.platform.common.PageResult;
import com.pmp.platform.common.Result;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** 59 个业务页面统一 CRUD 入口，页面表与列白名单由 catalog.json 决定。 */
@RestController
@RequestMapping("/api/v1/biz/{pageId}")
public class BizCrudController {

    private final BizCatalog catalog;
    private final BizCrudService service;

    public BizCrudController(BizCatalog catalog, BizCrudService service) {
        this.catalog = catalog;
        this.service = service;
    }

    @GetMapping
    public Result<PageResult<Map<String, Object>>> list(@PathVariable String pageId,
                                                        @RequestParam(defaultValue = "1") int page,
                                                        @RequestParam(defaultValue = "10") int size,
                                                        @RequestParam(required = false) String keyword,
                                                        @RequestParam(required = false) String dateFrom,
                                                        @RequestParam(required = false) String dateTo,
                                                        @RequestParam Map<String, String> params) {
        Map<String, String> filters = new LinkedHashMap<>();
        params.forEach((k, v) -> {
            if (k.startsWith("f_")) {
                filters.put(k.substring(2), v);
            }
        });
        return Result.ok(service.list(catalog.require(pageId), CurrentUser.require(),
                page, size, keyword, filters, dateFrom, dateTo));
    }

    @GetMapping("/{id}")
    public Result<Map<String, Object>> detail(@PathVariable String pageId, @PathVariable long id) {
        return Result.ok(service.detail(catalog.require(pageId), CurrentUser.require(), id));
    }

    @PostMapping
    public Result<Map<String, Object>> create(@PathVariable String pageId,
                                              @RequestBody Map<String, Object> payload) {
        return Result.ok(service.create(catalog.require(pageId), CurrentUser.require(), payload));
    }

    @PutMapping("/{id}")
    public Result<Map<String, Object>> update(@PathVariable String pageId, @PathVariable long id,
                                              @RequestBody Map<String, Object> payload) {
        return Result.ok(service.update(catalog.require(pageId), CurrentUser.require(), id, payload));
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable String pageId, @PathVariable long id) {
        service.delete(catalog.require(pageId), CurrentUser.require(), id);
        return Result.ok();
    }

    public record BatchDeleteRequest(List<Long> ids) {
    }

    @PostMapping("/batch-delete")
    public Result<Map<String, Object>> batchDelete(@PathVariable String pageId,
                                                   @RequestBody BatchDeleteRequest body) {
        int count = service.batchDelete(catalog.require(pageId), CurrentUser.require(),
                body == null ? List.of() : body.ids());
        return Result.ok(Map.of("deleted", count));
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> export(@PathVariable String pageId,
                                         @RequestParam(required = false) String keyword,
                                         @RequestParam(required = false) String dateFrom,
                                         @RequestParam(required = false) String dateTo,
                                         @RequestParam Map<String, String> params) {
        Map<String, String> filters = new LinkedHashMap<>();
        params.forEach((k, v) -> {
            if (k.startsWith("f_")) {
                filters.put(k.substring(2), v);
            }
        });
        BizCatalog.TableMeta meta = catalog.require(pageId);
        byte[] data = service.export(meta, CurrentUser.require(), keyword, filters, dateFrom, dateTo);
        String filename = URLEncoder.encode(meta.title() + "-" + System.currentTimeMillis() + ".csv", StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + filename)
                .contentType(MediaType.parseMediaType("text/csv;charset=UTF-8"))
                .body(data);
    }

    /** 表单下拉所需的标签字典（状态枚举来自页面列定义）。 */
    @GetMapping("/options")
    public Result<List<String>> options(@PathVariable String pageId,
                                        @RequestParam String column) {
        BizCatalog.TableMeta meta = catalog.require(pageId);
        List<String> result = new ArrayList<>();
        for (BizCatalog.ColumnMeta c : meta.columns()) {
            if (c.key().equals(column) && "tag".equals(c.type())) {
                result.add(c.label());
                break;
            }
        }
        return Result.ok(result);
    }
}
