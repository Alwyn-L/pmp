/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "outbound",
  "mod": "仓储",
  "slug": "wms",
  "type": "list",
  "title": "拣货与发货",
  "desc": "波次生成、拣货、复核、打包与发货交接，支持边拣边分与批量拣货。",
  "roles": [
    "wh",
    "logi",
    "sales",
    "admin"
  ],
  "jump": [
    {
      "label": "发货单",
      "id": "shipment"
    },
    {
      "label": "运输任务",
      "id": "transport-task"
    },
    {
      "label": "库存管理",
      "id": "inventory"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "拣货单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "wave",
      "label": "波次",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "order",
      "label": "订单数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "sku",
      "label": "SKU 数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "qty",
      "label": "件数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "zone",
      "label": "库区",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待拣货": "warning",
        "拣货中": "info",
        "已拣货": "success",
        "异常": "danger"
      }
    },
    {
      "key": "owner",
      "label": "拣货员",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "carrier",
      "label": "承运商",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "weight",
      "label": "重量",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "发货时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "拣货任务",
      "columns": [
        {
          "key": "code",
          "label": "拣货单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "wave",
          "label": "波次",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "order",
          "label": "订单数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "sku",
          "label": "SKU 数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "qty",
          "label": "件数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "zone",
          "label": "库区",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待拣货": "warning",
            "拣货中": "info",
            "已拣货": "success",
            "异常": "danger"
          }
        },
        {
          "key": "owner",
          "label": "拣货员",
          "width": 90,
          "kind": "text"
        }
      ]
    },
    {
      "name": "复核发货",
      "columns": [
        {
          "key": "code",
          "label": "复核单号",
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
          "key": "carrier",
          "label": "承运商",
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
          "key": "weight",
          "label": "重量",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待复核": "warning",
            "已复核": "info",
            "已发货": "success",
            "异常": "danger"
          }
        },
        {
          "key": "time",
          "label": "发货时间",
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
      "label": "拣货单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "wave",
      "label": "波次",
      "type": "input",
      "required": true
    },
    {
      "key": "order",
      "label": "订单数",
      "type": "input",
      "required": true
    },
    {
      "key": "sku",
      "label": "SKU 数",
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
      "key": "zone",
      "label": "库区",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待拣货",
        "拣货中",
        "已拣货",
        "异常"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "拣货员",
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
      "key": "weight",
      "label": "重量",
      "type": "input",
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
      "key": "wave",
      "label": "生成波次",
      "perm": "wh"
    },
    {
      "key": "pick",
      "label": "领取任务",
      "perm": "wh"
    },
    {
      "key": "ship",
      "label": "发货交接",
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
      "key": "check",
      "label": "复核",
      "perm": "wh"
    },
    {
      "key": "handover",
      "label": "交接",
      "perm": "wh"
    }
  ]
} as any
