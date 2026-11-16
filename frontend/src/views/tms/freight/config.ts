/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "freight",
  "mod": "物流",
  "slug": "tms",
  "type": "list",
  "title": "运费对账",
  "desc": "承运商账单与运单逐笔匹配，差异工单处理，确认后回传 ERP 计入成本与应付。",
  "roles": [
    "logi",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "承运商与运价",
      "id": "carrier"
    },
    {
      "label": "应收应付",
      "id": "receivable-payable"
    },
    {
      "label": "发票与结算",
      "id": "invoice-settlement"
    }
  ],
  "kpis": [
    {
      "label": "本月运费",
      "value": "86.4 万",
      "sub": "较上月 +3.2%"
    },
    {
      "label": "待对账",
      "value": "12",
      "sub": "金额 18.2 万"
    },
    {
      "label": "差异单",
      "value": "3",
      "sub": "超期 1 单"
    },
    {
      "label": "对账差异率",
      "value": "0.08%",
      "sub": "目标 ≤0.1%"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "对账单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "carrier",
      "label": "承运商",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "period",
      "label": "账期",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "bills",
      "label": "运单数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "amount",
      "label": "账单金额",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "diff",
      "label": "差异",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待对账": "warning",
        "有差异": "danger",
        "已确认": "success",
        "已推送 ERP": "success"
      }
    },
    {
      "key": "owner",
      "label": "对账人",
      "width": 90,
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
      "label": "承运商",
      "key": "carrier"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "待对账",
        "有差异",
        "已确认",
        "已推送 ERP"
      ],
      "key": "status"
    },
    {
      "type": "text",
      "label": "账期",
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
      "key": "carrier",
      "label": "承运商",
      "type": "input",
      "required": true
    },
    {
      "key": "period",
      "label": "账期",
      "type": "input",
      "required": true
    },
    {
      "key": "bills",
      "label": "运单数",
      "type": "input",
      "required": false
    },
    {
      "key": "amount",
      "label": "账单金额",
      "type": "input",
      "required": false
    },
    {
      "key": "diff",
      "label": "差异",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待对账",
        "有差异",
        "已确认",
        "已推送 ERP"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "对账人",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "import",
      "label": "导入账单",
      "perm": "logi"
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
      "label": "运单匹配",
      "perm": "logi"
    },
    {
      "key": "diff",
      "label": "差异处理",
      "perm": "logi"
    },
    {
      "key": "push",
      "label": "推送 ERP",
      "perm": "fin"
    }
  ]
} as any
