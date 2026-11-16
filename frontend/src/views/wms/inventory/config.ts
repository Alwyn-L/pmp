/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "inventory",
  "mod": "仓储",
  "slug": "wms",
  "type": "list",
  "title": "库存管理",
  "desc": "实物库存、可用库存、在途与锁定库存统一查询；可售库存由履约域计算，WMS 只报实物。",
  "roles": [
    "wh",
    "planner",
    "sales",
    "fin",
    "buyer",
    "admin"
  ],
  "jump": [
    {
      "label": "库存分配",
      "id": "order-review"
    },
    {
      "label": "补货计划",
      "id": "replenish"
    },
    {
      "label": "盘点管理",
      "id": "stocktake"
    }
  ],
  "kpis": [
    {
      "label": "库存 SKU",
      "value": "18,642",
      "sub": "多仓合计"
    },
    {
      "label": "库存金额",
      "value": "1.26 亿",
      "sub": "较上月 -2.1%"
    },
    {
      "label": "呆滞占比",
      "value": "6.2%",
      "sub": "目标 ≤5%"
    },
    {
      "label": "库存准确率",
      "value": "99.6%",
      "sub": "目标 ≥99.5%"
    }
  ],
  "columns": [
    {
      "key": "material",
      "label": "物料编码",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "物料名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "wh",
      "label": "仓库",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "loc",
      "label": "库位",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "batch",
      "label": "批次",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "qty",
      "label": "实物库存",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "lock",
      "label": "锁定",
      "width": 70,
      "kind": "text"
    },
    {
      "key": "available",
      "label": "可用",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "可用": "success",
        "锁定": "warning",
        "质检中": "info",
        "隔离": "danger"
      }
    },
    {
      "key": "age",
      "label": "库龄",
      "width": 70,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "物料编码",
      "key": "material"
    },
    {
      "type": "text",
      "label": "仓库",
      "key": "wh"
    },
    {
      "type": "select",
      "label": "库存状态",
      "options": [
        "全部",
        "可用",
        "锁定",
        "质检中",
        "隔离"
      ]
    },
    {
      "type": "select",
      "label": "库龄",
      "options": [
        "全部",
        "0-30 天",
        "31-90 天",
        "90 天以上"
      ],
      "key": "age"
    }
  ],
  "formFields": [
    {
      "key": "material",
      "label": "物料编码",
      "type": "input",
      "required": true
    },
    {
      "key": "name",
      "label": "物料名称",
      "type": "input",
      "required": true
    },
    {
      "key": "wh",
      "label": "仓库",
      "type": "input",
      "required": true
    },
    {
      "key": "loc",
      "label": "库位",
      "type": "input",
      "required": false
    },
    {
      "key": "batch",
      "label": "批次",
      "type": "input",
      "required": false
    },
    {
      "key": "qty",
      "label": "实物库存",
      "type": "input",
      "required": false
    },
    {
      "key": "lock",
      "label": "锁定",
      "type": "input",
      "required": false
    },
    {
      "key": "available",
      "label": "可用",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "可用",
        "锁定",
        "质检中",
        "隔离"
      ],
      "required": false
    },
    {
      "key": "age",
      "label": "库龄",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "export",
      "label": "导出"
    },
    {
      "key": "transfer",
      "label": "库存调拨",
      "perm": "wh"
    },
    {
      "key": "freeze",
      "label": "冻结",
      "perm": "wh"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "ledger",
      "label": "库存流水"
    },
    {
      "key": "transfer",
      "label": "调拨",
      "perm": "wh"
    },
    {
      "key": "lock",
      "label": "锁定",
      "perm": "wh"
    }
  ]
} as any
