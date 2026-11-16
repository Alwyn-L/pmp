/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "inbound",
  "mod": "仓储",
  "slug": "wms",
  "type": "list",
  "title": "收货与上架",
  "desc": "到货预约、收货、质检、上架与异常处理，库存以 WMS 实绩为准回写 ERP。",
  "roles": [
    "wh",
    "qc",
    "buyer",
    "admin"
  ],
  "jump": [
    {
      "label": "ASN 收货协同",
      "id": "asn"
    },
    {
      "label": "库存管理",
      "id": "inventory"
    },
    {
      "label": "质量管理",
      "id": "quality"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "收货单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "asn",
      "label": "ASN 单号",
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
      "label": "应收数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "recv",
      "label": "已收数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待收货": "warning",
        "部分收货": "info",
        "已收货": "success",
        "异常": "danger"
      }
    },
    {
      "key": "dock",
      "label": "月台",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "预约时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "material",
      "label": "物料",
      "width": 110,
      "kind": "mono"
    },
    {
      "key": "batch",
      "label": "批次",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "from",
      "label": "暂存位",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "to",
      "label": "目标库位",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "作业员",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "收货任务",
      "columns": [
        {
          "key": "code",
          "label": "收货单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "asn",
          "label": "ASN 单号",
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
          "label": "应收数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "recv",
          "label": "已收数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待收货": "warning",
            "部分收货": "info",
            "已收货": "success",
            "异常": "danger"
          }
        },
        {
          "key": "dock",
          "label": "月台",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "time",
          "label": "预约时间",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "上架任务",
      "columns": [
        {
          "key": "code",
          "label": "上架单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "material",
          "label": "物料",
          "width": 110,
          "kind": "mono"
        },
        {
          "key": "batch",
          "label": "批次",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "qty",
          "label": "数量",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "from",
          "label": "暂存位",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "to",
          "label": "目标库位",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待上架": "warning",
            "上架中": "info",
            "已完成": "success"
          }
        },
        {
          "key": "owner",
          "label": "作业员",
          "width": 90,
          "kind": "text"
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "收货单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "asn",
      "label": "ASN 单号",
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
      "label": "应收数",
      "type": "input",
      "required": false
    },
    {
      "key": "recv",
      "label": "已收数",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待收货",
        "部分收货",
        "已收货",
        "异常"
      ],
      "required": false
    },
    {
      "key": "dock",
      "label": "月台",
      "type": "input",
      "required": false
    },
    {
      "key": "time",
      "label": "预约时间",
      "type": "input",
      "required": false
    },
    {
      "key": "material",
      "label": "物料",
      "type": "input",
      "required": false
    },
    {
      "key": "batch",
      "label": "批次",
      "type": "input",
      "required": false
    },
    {
      "key": "from",
      "label": "暂存位",
      "type": "input",
      "required": false
    },
    {
      "key": "to",
      "label": "目标库位",
      "type": "input",
      "required": false
    },
    {
      "key": "owner",
      "label": "作业员",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "receive",
      "label": "收货登记",
      "perm": "wh"
    },
    {
      "key": "putaway",
      "label": "生成上架任务",
      "perm": "wh"
    },
    {
      "key": "print",
      "label": "打印标签",
      "perm": "wh"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "qc",
      "label": "质检",
      "perm": "qc"
    },
    {
      "key": "confirm",
      "label": "确认收货",
      "perm": "wh"
    },
    {
      "key": "putaway",
      "label": "上架",
      "perm": "wh"
    }
  ]
} as any
