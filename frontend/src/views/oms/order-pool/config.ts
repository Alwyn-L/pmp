/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "order-pool",
  "mod": "履约",
  "slug": "oms",
  "type": "list",
  "title": "订单池",
  "desc": "多渠道订单统一接入、去重、合规校验与优先级排序，进入审核前暂存。",
  "roles": [
    "sales",
    "planner",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "订单审核与分单",
      "id": "order-review"
    },
    {
      "label": "客户 360",
      "id": "customer"
    },
    {
      "label": "销售订单",
      "id": "sales-order"
    }
  ],
  "kpis": [
    {
      "label": "今日新增",
      "value": "1,286",
      "sub": "多渠道"
    },
    {
      "label": "待审核",
      "value": "86",
      "sub": "超时 6"
    },
    {
      "label": "异常订单",
      "value": "12",
      "sub": "地址/信用"
    },
    {
      "label": "自动通过率",
      "value": "78%",
      "sub": "规则校验"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "订单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "channel",
      "label": "渠道",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "customer",
      "label": "客户",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "amount",
      "label": "金额",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "items",
      "label": "商品数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "priority",
      "label": "优先级",
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
        "待审核": "warning",
        "已审核": "success",
        "异常": "danger",
        "已取消": "muted"
      }
    },
    {
      "key": "time",
      "label": "下单时间",
      "width": 150,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "订单号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "客户",
      "key": "customer"
    },
    {
      "type": "select",
      "label": "渠道",
      "options": [
        "全部",
        "电商",
        "直销",
        "经销",
        "API"
      ],
      "key": "channel"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "待审核",
        "已审核",
        "异常",
        "已取消"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "订单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "channel",
      "label": "渠道",
      "type": "input",
      "required": true
    },
    {
      "key": "customer",
      "label": "客户",
      "type": "input",
      "required": true
    },
    {
      "key": "amount",
      "label": "金额",
      "type": "input",
      "required": false
    },
    {
      "key": "items",
      "label": "商品数",
      "type": "input",
      "required": false
    },
    {
      "key": "priority",
      "label": "优先级",
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
        "待审核",
        "已审核",
        "异常",
        "已取消"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "下单时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "import",
      "label": "批量导入"
    },
    {
      "key": "rule",
      "label": "规则校验",
      "perm": "sales"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "audit",
      "label": "审核",
      "perm": "sales"
    },
    {
      "key": "split",
      "label": "拆单"
    },
    {
      "key": "cancel",
      "label": "取消",
      "perm": "sales"
    }
  ]
} as any
