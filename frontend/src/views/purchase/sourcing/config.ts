/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "sourcing",
  "mod": "采购",
  "slug": "purchase",
  "type": "list",
  "title": "寻源询价",
  "desc": "询价单发布、供应商报价、比价定标与结果发布，支持多轮报价与成本拆分。",
  "roles": [
    "buyer",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "供应商管理",
      "id": "supplier"
    },
    {
      "label": "采购申请",
      "id": "purchase-req"
    },
    {
      "label": "采购订单",
      "id": "purchase-order"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "询价单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "title",
      "label": "询价标题",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "material",
      "label": "物料",
      "width": 110,
      "kind": "mono"
    },
    {
      "key": "qty",
      "label": "数量",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "quotes",
      "label": "报价家数",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "deadline",
      "label": "截止时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "报价中": "info",
        "比价中": "warning",
        "已定标": "success"
      }
    },
    {
      "key": "owner",
      "label": "采购员",
      "width": 100,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "询价单号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "物料名称",
      "key": "keyword"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "报价中",
        "比价中",
        "已定标"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "询价单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "title",
      "label": "询价标题",
      "type": "input",
      "required": true
    },
    {
      "key": "material",
      "label": "物料",
      "type": "input",
      "required": true
    },
    {
      "key": "qty",
      "label": "数量",
      "type": "input",
      "required": false
    },
    {
      "key": "quotes",
      "label": "报价家数",
      "type": "input",
      "required": false
    },
    {
      "key": "deadline",
      "label": "截止时间",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "报价中",
        "比价中",
        "已定标"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "采购员",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建询价",
      "perm": "buyer"
    },
    {
      "key": "award",
      "label": "定标",
      "perm": "buyer"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "compare",
      "label": "比价"
    },
    {
      "key": "award",
      "label": "定标",
      "perm": "buyer"
    },
    {
      "key": "extend",
      "label": "延期",
      "perm": "buyer"
    }
  ]
} as any
