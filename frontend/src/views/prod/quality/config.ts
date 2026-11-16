/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "quality",
  "mod": "生产",
  "slug": "prod",
  "type": "list",
  "title": "质量管理",
  "desc": "来料、过程、成品检验任务与不良品处置，支持抽检方案、判定与整改闭环。",
  "roles": [
    "qc",
    "prod",
    "buyer",
    "admin"
  ],
  "jump": [
    {
      "label": "批次追溯",
      "id": "trace"
    },
    {
      "label": "ASN 收货协同",
      "id": "asn"
    },
    {
      "label": "安灯异常",
      "id": "andon"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "检验单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "type",
      "label": "检验类型",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "ref",
      "label": "关联单据",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "material",
      "label": "物料",
      "width": 110,
      "kind": "mono"
    },
    {
      "key": "sample",
      "label": "抽样数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "result",
      "label": "结果",
      "width": 80,
      "kind": "tag",
      "options": {
        "合格": "success",
        "不合格": "danger",
        "待检": "warning"
      }
    },
    {
      "key": "inspector",
      "label": "检验员",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "检验时间",
      "width": 150,
      "kind": "text"
    },
    {
      "key": "source",
      "label": "来源",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "defect",
      "label": "缺陷描述",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "qty",
      "label": "数量",
      "width": 70,
      "kind": "text"
    },
    {
      "key": "disposal",
      "label": "处置方式",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待评审": "warning",
        "返工": "info",
        "报废": "danger",
        "已闭环": "success"
      }
    }
  ],
  "tabs": [
    {
      "name": "检验任务",
      "columns": [
        {
          "key": "code",
          "label": "检验单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "type",
          "label": "检验类型",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "ref",
          "label": "关联单据",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "material",
          "label": "物料",
          "width": 110,
          "kind": "mono"
        },
        {
          "key": "sample",
          "label": "抽样数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "result",
          "label": "结果",
          "width": 80,
          "kind": "tag",
          "options": {
            "合格": "success",
            "不合格": "danger",
            "待检": "warning"
          }
        },
        {
          "key": "inspector",
          "label": "检验员",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "time",
          "label": "检验时间",
          "width": 150,
          "kind": "text"
        }
      ]
    },
    {
      "name": "不良品处置",
      "columns": [
        {
          "key": "code",
          "label": "不良单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "source",
          "label": "来源",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "material",
          "label": "物料",
          "width": 110,
          "kind": "mono"
        },
        {
          "key": "defect",
          "label": "缺陷描述",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "qty",
          "label": "数量",
          "width": 70,
          "kind": "text"
        },
        {
          "key": "disposal",
          "label": "处置方式",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待评审": "warning",
            "返工": "info",
            "报废": "danger",
            "已闭环": "success"
          }
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "检验单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "type",
      "label": "检验类型",
      "type": "input",
      "required": true
    },
    {
      "key": "ref",
      "label": "关联单据",
      "type": "input",
      "required": true
    },
    {
      "key": "material",
      "label": "物料",
      "type": "input",
      "required": false
    },
    {
      "key": "sample",
      "label": "抽样数",
      "type": "input",
      "required": false
    },
    {
      "key": "result",
      "label": "结果",
      "type": "select",
      "options": [
        "合格",
        "不合格",
        "待检"
      ],
      "required": false
    },
    {
      "key": "inspector",
      "label": "检验员",
      "type": "input",
      "required": false
    },
    {
      "key": "time",
      "label": "检验时间",
      "type": "input",
      "required": false
    },
    {
      "key": "source",
      "label": "来源",
      "type": "input",
      "required": false
    },
    {
      "key": "defect",
      "label": "缺陷描述",
      "type": "textarea",
      "required": false
    },
    {
      "key": "qty",
      "label": "数量",
      "type": "input",
      "required": false
    },
    {
      "key": "disposal",
      "label": "处置方式",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待评审",
        "返工",
        "报废",
        "已闭环"
      ],
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建检验",
      "perm": "qc"
    },
    {
      "key": "sampling",
      "label": "抽样方案",
      "perm": "qc"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "judge",
      "label": "判定",
      "perm": "qc"
    },
    {
      "key": "disposal",
      "label": "处置",
      "perm": "qc"
    },
    {
      "key": "close",
      "label": "闭环",
      "perm": "qc"
    }
  ]
} as any
