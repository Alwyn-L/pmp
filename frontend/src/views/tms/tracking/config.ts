/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "tracking",
  "mod": "物流",
  "slug": "tms",
  "type": "list",
  "title": "在途与签收",
  "desc": "全链路轨迹、异常（延误/破损/丢件）上报与签收回单管理，回传 OMS。",
  "roles": [
    "logi",
    "sales",
    "wh",
    "admin"
  ],
  "jump": [
    {
      "label": "运输任务",
      "id": "transport-task"
    },
    {
      "label": "发货单",
      "id": "shipment"
    },
    {
      "label": "运费对账",
      "id": "freight"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "运单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "carrier",
      "label": "承运商",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "route",
      "label": "线路",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "node",
      "label": "当前节点",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "progress",
      "label": "进度",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "eta",
      "label": "预计到达",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "正常": "success",
        "延误": "warning",
        "异常": "danger"
      }
    },
    {
      "key": "order",
      "label": "订单号",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "receiver",
      "label": "签收人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "sign",
      "label": "签收时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "签收方式",
      "width": 100,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "在途运输",
      "columns": [
        {
          "key": "code",
          "label": "运单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "carrier",
          "label": "承运商",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "route",
          "label": "线路",
          "width": 140,
          "kind": "text"
        },
        {
          "key": "node",
          "label": "当前节点",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "progress",
          "label": "进度",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "eta",
          "label": "预计到达",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "正常": "success",
            "延误": "warning",
            "异常": "danger"
          }
        }
      ]
    },
    {
      "name": "签收管理",
      "columns": [
        {
          "key": "code",
          "label": "运单号",
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
          "key": "receiver",
          "label": "签收人",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "sign",
          "label": "签收时间",
          "width": 140,
          "kind": "text"
        },
        {
          "key": "type",
          "label": "签收方式",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "已签收": "success",
            "拒收": "danger",
            "部分签收": "warning"
          }
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "运单号",
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
      "key": "route",
      "label": "线路",
      "type": "input",
      "required": true
    },
    {
      "key": "node",
      "label": "当前节点",
      "type": "input",
      "required": false
    },
    {
      "key": "progress",
      "label": "进度",
      "type": "input",
      "required": false
    },
    {
      "key": "eta",
      "label": "预计到达",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "正常",
        "延误",
        "异常"
      ],
      "required": false
    },
    {
      "key": "order",
      "label": "订单号",
      "type": "input",
      "required": false
    },
    {
      "key": "receiver",
      "label": "签收人",
      "type": "input",
      "required": false
    },
    {
      "key": "sign",
      "label": "签收时间",
      "type": "input",
      "required": false
    },
    {
      "key": "type",
      "label": "签收方式",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "exception",
      "label": "异常上报",
      "perm": "logi"
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
      "key": "trace",
      "label": "轨迹"
    },
    {
      "key": "sign",
      "label": "签收回单"
    },
    {
      "key": "exception",
      "label": "异常上报",
      "perm": "logi"
    }
  ]
} as any
