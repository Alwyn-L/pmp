/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "reconciliation",
  "mod": "采购",
  "slug": "purchase",
  "type": "list",
  "title": "三单匹配对账",
  "desc": "采购订单、收货单、发票三单匹配，差异生成工单，匹配通过后进入应付。",
  "roles": [
    "buyer",
    "supplier",
    "fin",
    "audit",
    "admin"
  ],
  "jump": [
    {
      "label": "采购订单",
      "id": "purchase-order"
    },
    {
      "label": "发票与结算",
      "id": "invoice-settlement"
    },
    {
      "label": "待办中心",
      "id": "todo"
    }
  ],
  "kpis": [
    {
      "label": "待对账",
      "value": "18",
      "sub": "金额 486 万"
    },
    {
      "label": "匹配通过",
      "value": "42",
      "sub": "本月"
    },
    {
      "label": "差异单",
      "value": "5",
      "sub": "超期 1 单"
    },
    {
      "label": "平均周期",
      "value": "1.6 天",
      "sub": "目标 ≤2 天"
    }
  ],
  "flow": {
    "steps": [
      "供应商对账",
      "三单匹配",
      "差异处理",
      "财务确认",
      "付款排程"
    ],
    "current": 1
  },
  "columns": [
    {
      "key": "code",
      "label": "对账单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "supplier",
      "label": "供应商",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "period",
      "label": "对账周期",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "amount",
      "label": "对账金额",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "diff",
      "label": "差异金额",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待对账": "warning",
        "匹配中": "info",
        "有差异": "danger",
        "已确认": "success"
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
      "label": "对账单号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "供应商",
      "key": "supplier"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "待对账",
        "匹配中",
        "有差异",
        "已确认"
      ],
      "key": "status"
    },
    {
      "type": "text",
      "label": "对账周期",
      "key": "period"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "对账单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "supplier",
      "label": "供应商",
      "type": "input",
      "required": true
    },
    {
      "key": "period",
      "label": "对账周期",
      "type": "input",
      "required": true
    },
    {
      "key": "amount",
      "label": "对账金额",
      "type": "input",
      "required": false
    },
    {
      "key": "diff",
      "label": "差异金额",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待对账",
        "匹配中",
        "有差异",
        "已确认"
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
      "label": "发起对账",
      "perm": "buyer"
    },
    {
      "key": "confirm",
      "label": "批量确认",
      "perm": "fin"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "match",
      "label": "三单匹配",
      "perm": "buyer"
    },
    {
      "key": "diff",
      "label": "差异处理",
      "perm": "buyer"
    },
    {
      "key": "confirm",
      "label": "财务确认",
      "perm": "fin"
    }
  ]
} as any
