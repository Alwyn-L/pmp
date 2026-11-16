/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "replenish",
  "mod": "计划",
  "slug": "plan",
  "type": "list",
  "title": "补货计划",
  "desc": "依据安全库存、在途与需求预测生成补货建议，转采购申请或生产计划。",
  "roles": [
    "planner",
    "buyer",
    "wh",
    "admin"
  ],
  "jump": [
    {
      "label": "采购申请",
      "id": "purchase-req"
    },
    {
      "label": "库存管理",
      "id": "inventory"
    },
    {
      "label": "采购订单",
      "id": "purchase-order"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "物料编码",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "物料名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "stock",
      "label": "当前库存",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "safe",
      "label": "安全库存",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "gap",
      "label": "缺口",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "补货方式",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "urgent",
      "label": "紧急度",
      "width": 80,
      "kind": "tag",
      "options": {
        "高": "danger",
        "中": "warning",
        "低": "muted"
      }
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待审批": "warning",
        "待处理": "warning",
        "待确认": "warning",
        "进行中": "info",
        "待收货": "info",
        "待发货": "info",
        "待分配": "info",
        "运行中": "info",
        "处理中": "info",
        "待对账": "warning"
      }
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "物料编码",
      "key": "code"
    },
    {
      "type": "select",
      "label": "补货类型",
      "options": [
        "全部",
        "采购补货",
        "生产补货",
        "调拨补货"
      ]
    },
    {
      "type": "select",
      "label": "紧急度",
      "options": [
        "全部",
        "高",
        "中",
        "低"
      ],
      "key": "urgent"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "物料编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "物料名称",
      "type": "input",
      "required": true
    },
    {
      "key": "stock",
      "label": "当前库存",
      "type": "input",
      "required": true
    },
    {
      "key": "safe",
      "label": "安全库存",
      "type": "input",
      "required": false
    },
    {
      "key": "gap",
      "label": "缺口",
      "type": "input",
      "required": false
    },
    {
      "key": "type",
      "label": "补货方式",
      "type": "input",
      "required": false
    },
    {
      "key": "urgent",
      "label": "紧急度",
      "type": "select",
      "options": [
        "高",
        "中",
        "低"
      ],
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待审批",
        "待处理",
        "待确认",
        "进行中",
        "待收货",
        "待发货",
        "待分配",
        "运行中",
        "处理中",
        "待对账"
      ],
      "required": false
    }
  ],
  "actions": [
    {
      "key": "generate",
      "label": "生成补货建议",
      "perm": "planner"
    },
    {
      "key": "to-pr",
      "label": "转采购申请",
      "perm": "planner"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "ignore",
      "label": "忽略"
    },
    {
      "key": "convert",
      "label": "转单",
      "perm": "planner"
    }
  ]
} as any
