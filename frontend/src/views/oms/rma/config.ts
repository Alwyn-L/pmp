/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "rma",
  "mod": "履约",
  "slug": "oms",
  "type": "list",
  "title": "退换货 RMA",
  "desc": "退货申请、审核、退货入库、质检与退款/换货闭环，库存与应收联动冲减。",
  "roles": [
    "sales",
    "wh",
    "qc",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "订单审核与分单",
      "id": "order-review"
    },
    {
      "label": "收货与上架",
      "id": "inbound"
    },
    {
      "label": "应收应付",
      "id": "receivable-payable"
    }
  ],
  "kpis": [
    {
      "label": "待处理",
      "value": "9",
      "sub": "超时 2"
    },
    {
      "label": "本月退货率",
      "value": "1.8%",
      "sub": "目标 ≤2%"
    },
    {
      "label": "退款金额",
      "value": "12.6 万",
      "sub": "本月"
    },
    {
      "label": "再销售率",
      "value": "72%",
      "sub": "质检合格"
    }
  ],
  "flow": {
    "steps": [
      "退货申请",
      "审核",
      "退货入库",
      "质检",
      "退款/换货"
    ],
    "current": 1
  },
  "columns": [
    {
      "key": "code",
      "label": "RMA 单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "order",
      "label": "原订单号",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "customer",
      "label": "客户",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "qty",
      "label": "数量",
      "width": 70,
      "kind": "text"
    },
    {
      "key": "reason",
      "label": "退货原因",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待审核": "warning",
        "待入库": "info",
        "质检中": "warning",
        "已退款": "success",
        "已关闭": "muted"
      }
    },
    {
      "key": "time",
      "label": "申请时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "RMA 单号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "原订单号",
      "key": "order"
    },
    {
      "type": "select",
      "label": "类型",
      "options": [
        "全部",
        "退货",
        "换货",
        "维修"
      ],
      "key": "type"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "待审核",
        "待入库",
        "质检中",
        "已退款",
        "已关闭"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "RMA 单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "order",
      "label": "原订单号",
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
      "key": "type",
      "label": "类型",
      "type": "input",
      "required": false
    },
    {
      "key": "qty",
      "label": "数量",
      "type": "input",
      "required": false
    },
    {
      "key": "reason",
      "label": "退货原因",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待审核",
        "待入库",
        "质检中",
        "已退款",
        "已关闭"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "申请时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建 RMA",
      "perm": "sales"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "approve",
      "label": "审核",
      "perm": "sales"
    },
    {
      "key": "receive",
      "label": "退货入库",
      "perm": "wh"
    },
    {
      "key": "qc",
      "label": "质检",
      "perm": "qc"
    },
    {
      "key": "refund",
      "label": "退款",
      "perm": "fin"
    }
  ]
} as any
