/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "invoice-settlement",
  "mod": "财务协同",
  "slug": "fin",
  "type": "list",
  "title": "发票与结算",
  "desc": "发票登记、验真、三单匹配与结算付款排程；与金税系统对接，异常发票进入人工复核。",
  "roles": [
    "fin",
    "buyer",
    "sales",
    "audit",
    "admin"
  ],
  "jump": [
    {
      "label": "三单匹配对账",
      "id": "reconciliation"
    },
    {
      "label": "应收应付",
      "id": "receivable-payable"
    },
    {
      "label": "采购订单",
      "id": "purchase-order"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "发票号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 90,
      "kind": "tag",
      "options": {
        "进项": "info",
        "销项": "warning"
      }
    },
    {
      "key": "party",
      "label": "往来单位",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "amount",
      "label": "金额",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "tax",
      "label": "税额",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "date",
      "label": "开票日期",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待验真": "warning",
        "已验真": "success",
        "异常": "danger",
        "已认证": "success"
      }
    },
    {
      "key": "period",
      "label": "结算周期",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "method",
      "label": "结算方式",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "创建时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "发票管理",
      "columns": [
        {
          "key": "code",
          "label": "发票号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "type",
          "label": "类型",
          "width": 90,
          "kind": "tag",
          "options": {
            "进项": "info",
            "销项": "warning"
          }
        },
        {
          "key": "party",
          "label": "往来单位",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "amount",
          "label": "金额",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "tax",
          "label": "税额",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "date",
          "label": "开票日期",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待验真": "warning",
            "已验真": "success",
            "异常": "danger",
            "已认证": "success"
          }
        }
      ]
    },
    {
      "name": "结算单",
      "columns": [
        {
          "key": "code",
          "label": "结算单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "party",
          "label": "往来单位",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "period",
          "label": "结算周期",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "amount",
          "label": "结算金额",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "method",
          "label": "结算方式",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待确认": "warning",
            "已确认": "info",
            "已付款": "success",
            "驳回": "danger"
          }
        },
        {
          "key": "time",
          "label": "创建时间",
          "width": 140,
          "kind": "text"
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "发票号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "type",
      "label": "类型",
      "type": "select",
      "options": [
        "进项",
        "销项"
      ],
      "required": true
    },
    {
      "key": "party",
      "label": "往来单位",
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
      "key": "tax",
      "label": "税额",
      "type": "input",
      "required": false
    },
    {
      "key": "date",
      "label": "开票日期",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待验真",
        "已验真",
        "异常",
        "已认证"
      ],
      "required": false
    },
    {
      "key": "period",
      "label": "结算周期",
      "type": "input",
      "required": false
    },
    {
      "key": "method",
      "label": "结算方式",
      "type": "input",
      "required": false
    },
    {
      "key": "time",
      "label": "创建时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "invoice",
      "label": "发票登记",
      "perm": "fin"
    },
    {
      "key": "verify",
      "label": "批量验真",
      "perm": "fin"
    },
    {
      "key": "settle",
      "label": "生成结算单",
      "perm": "fin"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "verify",
      "label": "验真",
      "perm": "fin"
    },
    {
      "key": "settle",
      "label": "结算",
      "perm": "fin"
    },
    {
      "key": "voucher",
      "label": "查看凭证"
    }
  ]
} as any
