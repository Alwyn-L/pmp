/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "asn",
  "mod": "采购",
  "slug": "purchase",
  "type": "list",
  "title": "ASN 收货协同",
  "desc": "供应商发货通知、预约到货、收货回执与来料检验结果回传。",
  "roles": [
    "buyer",
    "supplier",
    "wh",
    "qc",
    "admin"
  ],
  "jump": [
    {
      "label": "收货与上架",
      "id": "inbound"
    },
    {
      "label": "质量管理",
      "id": "quality"
    },
    {
      "label": "采购订单",
      "id": "purchase-order"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "ASN 单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "po",
      "label": "采购订单",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "supplier",
      "label": "供应商",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "qty",
      "label": "发货数量",
      "width": 90,
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
        "待发货": "muted",
        "运输中": "info",
        "待收货": "warning",
        "已收货": "success",
        "异常": "danger"
      }
    },
    {
      "key": "qc",
      "label": "质检结果",
      "width": 90,
      "kind": "tag",
      "options": {
        "合格": "success",
        "待检": "warning",
        "不合格": "danger"
      }
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "ASN 单号",
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
        "待发货",
        "运输中",
        "待收货",
        "已收货",
        "异常"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "ASN 单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "po",
      "label": "采购订单",
      "type": "input",
      "required": true
    },
    {
      "key": "supplier",
      "label": "供应商",
      "type": "input",
      "required": true
    },
    {
      "key": "qty",
      "label": "发货数量",
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
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待发货",
        "运输中",
        "待收货",
        "已收货",
        "异常"
      ],
      "required": false
    },
    {
      "key": "qc",
      "label": "质检结果",
      "type": "select",
      "options": [
        "合格",
        "待检",
        "不合格"
      ],
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "创建 ASN",
      "perm": "supplier"
    },
    {
      "key": "appointment",
      "label": "到货预约",
      "perm": "supplier"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "receive",
      "label": "确认收货",
      "perm": "wh"
    },
    {
      "key": "qc",
      "label": "质检登记",
      "perm": "qc"
    },
    {
      "key": "print",
      "label": "打印标签"
    }
  ]
} as any
