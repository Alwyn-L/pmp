package com.pmp.platform.biz;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** 业务页面目录：从生成的 catalog.json 加载表名与列白名单。 */
@Component
public class BizCatalog {

    public record ColumnMeta(String key, String label, String type) {
    }

    public record TableMeta(String pageId, String table, String module, String title,
                            List<ColumnMeta> columns, List<String> searchColumns) {
    }

    private final Map<String, TableMeta> pages = new LinkedHashMap<>();

    @SuppressWarnings("unchecked")
    public BizCatalog(ObjectMapper objectMapper) {
        try (InputStream in = new ClassPathResource("biz/catalog.json").getInputStream()) {
            Map<String, Object> root = objectMapper.readValue(in, Map.class);
            for (Map<String, Object> item : (List<Map<String, Object>>) root.get("pages")) {
                List<ColumnMeta> columns = ((List<Map<String, Object>>) item.get("columns")).stream()
                        .map(c -> new ColumnMeta((String) c.get("key"), (String) c.get("label"), (String) c.get("type")))
                        .toList();
                List<String> search = (List<String>) item.get("searchColumns");
                TableMeta meta = new TableMeta((String) item.get("pageId"), (String) item.get("table"),
                        (String) item.get("module"), (String) item.get("title"), columns, search);
                pages.put(meta.pageId(), meta);
            }
        } catch (Exception ex) {
            throw new IllegalStateException("加载 biz/catalog.json 失败", ex);
        }
    }

    public TableMeta require(String pageId) {
        TableMeta meta = pages.get(pageId);
        if (meta == null) {
            throw new com.pmp.platform.common.ApiException(404, "未知业务页面: " + pageId);
        }
        return meta;
    }

    public int size() {
        return pages.size();
    }
}
