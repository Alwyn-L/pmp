/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "sales-order",
  "mod": "客户",
  "slug": "crm",
  "type": "list",
  "title": "销售订单",
  "desc": "销售订单创建、价格与信用校验、变更与关闭；B2B 以 ERP 为订单归属，B2C 由 OMS 承接。",
  "roles": [
    "sales",
    "fin",
    "planner",
    "admin"
  ],
  "jump": [
    {
      "label": "订单池",
      "id": "order-pool"
    },
    {
      "label": "订单审核与分单",
      "id": "order-review"
    },
    {
      "label": "应收应付",
      "id": "receivable-payable"
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
      "key": "customer",
      "label": "客户",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "source",
      "label": "来源",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "amount",
      "label": "金额",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "delivery",
      "label": "交期",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "待审核": "warning",
        "执行中": "info",
        "已完成": "success",
        "已取消": "muted"
      }
    },
    {
      "key": "owner",
      "label": "销售",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "下单时间",
      "width": 140,
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
      "label": "订单来源",
      "options": [
        "全部",
        "ERP",
        "OMS",
        "CRM"
      ]
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "待审核",
        "执行中",
        "已完成",
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
      "key": "customer",
      "label": "客户",
      "type": "input",
      "required": true
    },
    {
      "key": "source",
      "label": "来源",
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
      "key": "delivery",
      "label": "交期",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "待审核",
        "执行中",
        "已完成",
        "已取消"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "销售",
      "type": "input",
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
      "key": "create",
      "label": "新建订单",
      "perm": "sales"
    },
    {
      "key": "import",
      "label": "导入"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "edit",
      "label": "编辑",
      "perm": "sales"
    },
    {
      "key": "change",
      "label": "变更",
      "perm": "sales"
    },
    {
      "key": "close",
      "label": "关闭",
      "perm": "sales"
    }
  ]
} as any
