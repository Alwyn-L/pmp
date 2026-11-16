/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "trace",
  "mod": "生产",
  "slug": "prod",
  "type": "list",
  "title": "批次追溯",
  "desc": "按批次/序列号正向追踪去向、反向追溯来源，覆盖原料、工序、检验与发货。",
  "roles": [
    "qc",
    "prod",
    "sales",
    "admin"
  ],
  "jump": [
    {
      "label": "质量管理",
      "id": "quality"
    },
    {
      "label": "库存管理",
      "id": "inventory"
    },
    {
      "label": "发货单",
      "id": "shipment"
    }
  ],
  "columns": [
    {
      "key": "batch",
      "label": "批次号",
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
      "key": "name",
      "label": "物料名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "supplier",
      "label": "供应商",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "wo",
      "label": "来源工单",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "qc",
      "label": "检验结果",
      "width": 90,
      "kind": "tag",
      "options": {
        "合格": "success",
        "不合格": "danger"
      }
    },
    {
      "key": "to",
      "label": "当前去向",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "入库时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "批次号/序列号",
      "key": "keyword"
    },
    {
      "type": "text",
      "label": "物料编码",
      "key": "keyword"
    },
    {
      "type": "select",
      "label": "追溯方向",
      "options": [
        "全部",
        "正向",
        "反向"
      ]
    }
  ],
  "formFields": [
    {
      "key": "batch",
      "label": "批次号",
      "type": "input",
      "required": true
    },
    {
      "key": "material",
      "label": "物料",
      "type": "input",
      "required": true
    },
    {
      "key": "name",
      "label": "物料名称",
      "type": "input",
      "required": true
    },
    {
      "key": "supplier",
      "label": "供应商",
      "type": "input",
      "required": false
    },
    {
      "key": "wo",
      "label": "来源工单",
      "type": "input",
      "required": false
    },
    {
      "key": "qc",
      "label": "检验结果",
      "type": "select",
      "options": [
        "合格",
        "不合格"
      ],
      "required": false
    },
    {
      "key": "to",
      "label": "当前去向",
      "type": "input",
      "required": false
    },
    {
      "key": "time",
      "label": "入库时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "graph",
      "label": "追溯图谱"
    },
    {
      "key": "export",
      "label": "导出"
    }
  ],
  "rowActions": [
    {
      "key": "forward",
      "label": "正向追溯"
    },
    {
      "key": "backward",
      "label": "反向追溯"
    },
    {
      "key": "detail",
      "label": "明细"
    }
  ]
} as any
