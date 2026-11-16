/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "transport-task",
  "mod": "物流",
  "slug": "tms",
  "type": "list",
  "title": "运输任务",
  "desc": "运输任务生成、承运商指派、装车与发运；支持整车、零担与快递三类模式。",
  "roles": [
    "logi",
    "wh",
    "sales",
    "admin"
  ],
  "jump": [
    {
      "label": "承运商与运价",
      "id": "carrier"
    },
    {
      "label": "在途与签收",
      "id": "tracking"
    },
    {
      "label": "运费对账",
      "id": "freight"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "运输单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "shipment",
      "label": "发货单号",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "mode",
      "label": "模式",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "from",
      "label": "起运地",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "to",
      "label": "目的地",
      "width": 120,
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
        "待指派": "warning",
        "待装车": "info",
        "运输中": "info",
        "已签收": "success"
      }
    },
    {
      "key": "eta",
      "label": "预计到达",
      "width": 120,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "运输单号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "发货单号",
      "key": "shipment"
    },
    {
      "type": "select",
      "label": "运输模式",
      "options": [
        "全部",
        "整车",
        "零担",
        "快递"
      ]
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "待指派",
        "待装车",
        "运输中",
        "已签收"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "运输单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "shipment",
      "label": "发货单号",
      "type": "input",
      "required": true
    },
    {
      "key": "mode",
      "label": "模式",
      "type": "input",
      "required": true
    },
    {
      "key": "from",
      "label": "起运地",
      "type": "input",
      "required": false
    },
    {
      "key": "to",
      "label": "目的地",
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
        "待指派",
        "待装车",
        "运输中",
        "已签收"
      ],
      "required": false
    },
    {
      "key": "eta",
      "label": "预计到达",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建运输任务",
      "perm": "logi"
    },
    {
      "key": "assign",
      "label": "批量指派",
      "perm": "logi"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "assign",
      "label": "指派",
      "perm": "logi"
    },
    {
      "key": "load",
      "label": "装车",
      "perm": "wh"
    },
    {
      "key": "track",
      "label": "跟踪"
    }
  ]
} as any
