/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "supplier-portal",
  "mod": "采购",
  "slug": "purchase",
  "type": "list",
  "title": "供应商门户",
  "desc": "面向外部供应商的统一入口：注册准入、订单确认、ASN 发货、对账开票与资质维护，外部账号由 IAM 统一托管。",
  "roles": [
    "supplier",
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
      "label": "采购订单",
      "id": "purchase-order"
    },
    {
      "label": "ASN 收货协同",
      "id": "asn"
    },
    {
      "label": "三单匹配对账",
      "id": "reconciliation"
    }
  ],
  "kpis": [
    {
      "label": "待确认订单",
      "value": "6",
      "sub": "超 24h 未确认 2"
    },
    {
      "label": "待发货 ASN",
      "value": "4",
      "sub": "今日应发 3"
    },
    {
      "label": "待对账",
      "value": "3",
      "sub": "差异 1 单"
    },
    {
      "label": "资质到期",
      "value": "2",
      "sub": "30 天内"
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
      "key": "material",
      "label": "物料",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "qty",
      "label": "数量",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "price",
      "label": "单价",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "delivery",
      "label": "要求交期",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待确认": "warning",
        "已确认": "success",
        "已拒绝": "danger",
        "已发货": "info"
      }
    },
    {
      "key": "time",
      "label": "下单时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "order",
      "label": "订单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "carton",
      "label": "箱数",
      "width": 70,
      "kind": "text"
    },
    {
      "key": "carrier",
      "label": "承运商",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "eta",
      "label": "预计到货",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "period",
      "label": "账期",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "amount",
      "label": "对账金额",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "invoice",
      "label": "发票状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "未开票": "warning",
        "已开票": "success",
        "已付款": "info"
      }
    },
    {
      "key": "item",
      "label": "资料项",
      "width": 150,
      "kind": "text"
    },
    {
      "key": "value",
      "label": "内容",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "expire",
      "label": "有效期",
      "width": 110,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "订单协同",
      "columns": [
        {
          "key": "code",
          "label": "订单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "material",
          "label": "物料",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "qty",
          "label": "数量",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "price",
          "label": "单价",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "delivery",
          "label": "要求交期",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待确认": "warning",
            "已确认": "success",
            "已拒绝": "danger",
            "已发货": "info"
          }
        },
        {
          "key": "time",
          "label": "下单时间",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "发货与 ASN",
      "columns": [
        {
          "key": "code",
          "label": "ASN 单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "order",
          "label": "订单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "qty",
          "label": "发货数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "carton",
          "label": "箱数",
          "width": 70,
          "kind": "text"
        },
        {
          "key": "carrier",
          "label": "承运商",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "eta",
          "label": "预计到货",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待发货": "warning",
            "运输中": "info",
            "已签收": "success"
          }
        }
      ]
    },
    {
      "name": "对账与开票",
      "columns": [
        {
          "key": "code",
          "label": "对账单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "period",
          "label": "账期",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "amount",
          "label": "对账金额",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "invoice",
          "label": "发票状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "未开票": "warning",
            "已开票": "success",
            "已付款": "info"
          }
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待确认": "warning",
            "已确认": "success",
            "异议": "danger"
          }
        },
        {
          "key": "time",
          "label": "创建时间",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "企业资料",
      "columns": [
        {
          "key": "item",
          "label": "资料项",
          "width": 150,
          "kind": "text"
        },
        {
          "key": "value",
          "label": "内容",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "expire",
          "label": "有效期",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "有效": "success",
            "即将到期": "warning",
            "已过期": "danger"
          }
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "订单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
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
      "required": true
    },
    {
      "key": "price",
      "label": "单价",
      "type": "input",
      "required": false
    },
    {
      "key": "delivery",
      "label": "要求交期",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待确认",
        "已确认",
        "已拒绝",
        "已发货"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "下单时间",
      "type": "input",
      "required": false
    },
    {
      "key": "order",
      "label": "订单号",
      "type": "input",
      "required": false
    },
    {
      "key": "carton",
      "label": "箱数",
      "type": "input",
      "required": false
    },
    {
      "key": "carrier",
      "label": "承运商",
      "type": "input",
      "required": false
    },
    {
      "key": "eta",
      "label": "预计到货",
      "type": "input",
      "required": false
    },
    {
      "key": "period",
      "label": "账期",
      "type": "input",
      "required": false
    },
    {
      "key": "amount",
      "label": "对账金额",
      "type": "input",
      "required": false,
      "tip": "取收货实绩 × 订单单价，差异需在门户申诉",
      "rule": "WMS 实绩为准，财务复核"
    },
    {
      "key": "invoice",
      "label": "发票状态",
      "type": "select",
      "options": [
        "未开票",
        "已开票",
        "已付款"
      ],
      "required": false
    },
    {
      "key": "item",
      "label": "资料项",
      "type": "input",
      "required": false
    },
    {
      "key": "value",
      "label": "内容",
      "type": "textarea",
      "required": false
    },
    {
      "key": "expire",
      "label": "有效期",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "confirm",
      "label": "批量确认订单",
      "perm": "supplier"
    },
    {
      "key": "asn",
      "label": "创建 ASN",
      "perm": "supplier"
    },
    {
      "key": "export",
      "label": "导出"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "confirm",
      "label": "确认接单",
      "perm": "supplier"
    },
    {
      "key": "reject",
      "label": "拒绝",
      "perm": "supplier"
    },
    {
      "key": "asn",
      "label": "发货",
      "perm": "supplier"
    }
  ],
  "fields": [
    [
      "供应商编码",
      "门户不生成编码，注册通过后由 SRM 分配",
      "SRM 唯一写入，门户只读"
    ],
    [
      "订单确认",
      "供应商仅可确认交期与数量，不可改价",
      "门户可写，ERP 订阅事件"
    ],
    [
      "ASN 单号",
      "按编码规则 ASN-年月-流水生成",
      "门户发起，WMS 收货校验"
    ],
    [
      "对账金额",
      "取收货实绩 × 订单单价，差异需在门户申诉",
      "WMS 实绩为准，财务复核"
    ],
    [
      "外部账号",
      "由 IAM 托管，绑定供应商编码与数据范围",
      "IAM 统一认证，禁止自建账号"
    ]
  ]
} as any
