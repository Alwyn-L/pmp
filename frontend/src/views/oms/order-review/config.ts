/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "order-review",
  "mod": "履约",
  "slug": "oms",
  "type": "list",
  "title": "订单审核与分单",
  "desc": "信用、价格、库存校验，按仓库与承运规则自动分单，锁定可售库存。",
  "roles": [
    "sales",
    "planner",
    "fin",
    "wh",
    "admin"
  ],
  "jump": [
    {
      "label": "订单池",
      "id": "order-pool"
    },
    {
      "label": "发货单",
      "id": "shipment"
    },
    {
      "label": "库存管理",
      "id": "inventory"
    }
  ],
  "flow": {
    "steps": [
      "订单校验",
      "信用审核",
      "库存分配",
      "分单",
      "生成发货单"
    ],
    "current": 2
  },
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
      "key": "amount",
      "label": "金额",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "credit",
      "label": "信用校验",
      "width": 100,
      "kind": "tag",
      "options": {
        "通过": "success",
        "超额": "danger",
        "待校验": "warning"
      }
    },
    {
      "key": "stock",
      "label": "库存分配",
      "width": 100,
      "kind": "tag",
      "options": {
        "已锁定": "success",
        "部分缺货": "warning",
        "缺货": "danger"
      }
    },
    {
      "key": "warehouse",
      "label": "分仓",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待审核": "warning",
        "已审核": "info",
        "已分单": "success",
        "驳回": "danger"
      }
    },
    {
      "key": "time",
      "label": "审核时间",
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
      "label": "审核状态",
      "options": [
        "全部",
        "待审核",
        "已审核",
        "驳回"
      ]
    },
    {
      "type": "select",
      "label": "分单状态",
      "options": [
        "全部",
        "待分单",
        "已分单",
        "缺货"
      ]
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
      "key": "amount",
      "label": "金额",
      "type": "input",
      "required": true
    },
    {
      "key": "credit",
      "label": "信用校验",
      "type": "select",
      "options": [
        "通过",
        "超额",
        "待校验"
      ],
      "required": false
    },
    {
      "key": "stock",
      "label": "库存分配",
      "type": "select",
      "options": [
        "已锁定",
        "部分缺货",
        "缺货"
      ],
      "required": false
    },
    {
      "key": "warehouse",
      "label": "分仓",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待审核",
        "已审核",
        "已分单",
        "驳回"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "审核时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "batch",
      "label": "批量审核",
      "perm": "sales"
    },
    {
      "key": "allocate",
      "label": "批量分配",
      "perm": "planner"
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
      "key": "allocate",
      "label": "库存分配",
      "perm": "planner"
    },
    {
      "key": "split",
      "label": "拆单",
      "perm": "sales"
    },
    {
      "key": "reject",
      "label": "驳回",
      "perm": "sales"
    }
  ]
} as any
