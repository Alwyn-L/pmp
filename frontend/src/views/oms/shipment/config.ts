/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "shipment",
  "mod": "履约",
  "slug": "oms",
  "type": "list",
  "title": "发货单",
  "desc": "发货单生成、拣货出库、包装称重与承运交接，状态实时回传 OMS 与 CRM。",
  "roles": [
    "sales",
    "wh",
    "logi",
    "admin"
  ],
  "jump": [
    {
      "label": "拣货与发货",
      "id": "outbound"
    },
    {
      "label": "运输任务",
      "id": "transport-task"
    },
    {
      "label": "在途与签收",
      "id": "tracking"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "发货单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "order",
      "label": "订单号",
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
      "key": "warehouse",
      "label": "仓库",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "qty",
      "label": "件数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "carrier",
      "label": "承运商",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待拣货": "warning",
        "待发货": "info",
        "已发货": "info",
        "已签收": "success"
      }
    },
    {
      "key": "time",
      "label": "发货时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "发货单号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "订单号",
      "key": "order"
    },
    {
      "type": "select",
      "label": "仓库",
      "options": [
        "全部",
        "华东成品仓",
        "华南成品仓"
      ],
      "key": "warehouse"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "待拣货",
        "待发货",
        "已发货",
        "已签收"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "发货单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "order",
      "label": "订单号",
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
      "key": "warehouse",
      "label": "仓库",
      "type": "input",
      "required": false
    },
    {
      "key": "qty",
      "label": "件数",
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
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待拣货",
        "待发货",
        "已发货",
        "已签收"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "发货时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "生成发货单",
      "perm": "wh"
    },
    {
      "key": "print",
      "label": "打印面单",
      "perm": "wh"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "pick",
      "label": "拣货",
      "perm": "wh"
    },
    {
      "key": "ship",
      "label": "确认发货",
      "perm": "wh"
    },
    {
      "key": "track",
      "label": "物流跟踪"
    }
  ]
} as any
