/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "routing",
  "mod": "研发协同",
  "slug": "rd",
  "type": "list",
  "title": "工艺路线",
  "desc": "维护工序、工作中心、标准工时与检验点，工单下达前同步至 MES。",
  "roles": [
    "rd",
    "prod",
    "qc",
    "mdm",
    "admin"
  ],
  "jump": [
    {
      "label": "BOM 管理",
      "id": "bom"
    },
    {
      "label": "工单管理",
      "id": "work-order"
    },
    {
      "label": "质量检验",
      "id": "quality"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "工艺编码",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "material",
      "label": "物料编码",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "工艺名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "steps",
      "label": "工序数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "center",
      "label": "工作中心",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "std",
      "label": "标准工时",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "启用": "success",
        "停用": "muted"
      }
    },
    {
      "key": "ver",
      "label": "版本",
      "width": 70,
      "kind": "mono"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "工艺编码",
      "key": "code"
    },
    {
      "type": "text",
      "label": "物料编码",
      "key": "material"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "启用",
        "停用"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "工艺编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成",
      "tip": "系统生成",
      "rule": "只读"
    },
    {
      "key": "material",
      "label": "物料编码",
      "type": "input",
      "required": true,
      "tip": "关联物料，必选",
      "rule": "研发"
    },
    {
      "key": "name",
      "label": "工艺名称",
      "type": "input",
      "required": true
    },
    {
      "key": "steps",
      "label": "工序数",
      "type": "input",
      "required": false
    },
    {
      "key": "center",
      "label": "工作中心",
      "type": "input",
      "required": false,
      "tip": "来自 MES 工作中心主数据",
      "rule": "工艺工程师"
    },
    {
      "key": "std",
      "label": "标准工时",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "启用",
        "停用"
      ],
      "required": false
    },
    {
      "key": "ver",
      "label": "版本",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建工艺",
      "perm": "rd"
    },
    {
      "key": "import",
      "label": "导入",
      "perm": "rd"
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
      "perm": "rd"
    },
    {
      "key": "copy",
      "label": "复制新版本",
      "perm": "rd"
    },
    {
      "key": "publish",
      "label": "发布",
      "perm": "rd"
    }
  ],
  "fields": [
    [
      "工艺编码",
      "系统生成",
      "只读"
    ],
    [
      "物料编码",
      "关联物料，必选",
      "研发"
    ],
    [
      "工序顺序",
      "整数递增，不可重复",
      "工艺工程师"
    ],
    [
      "工作中心",
      "来自 MES 工作中心主数据",
      "工艺工程师"
    ],
    [
      "检验点",
      "首检/巡检/终检可多选",
      "质量与工艺共同确认"
    ]
  ]
} as any
