/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "bom",
  "mod": "研发协同",
  "slug": "rd",
  "type": "list",
  "title": "BOM 管理",
  "desc": "维护设计 BOM（EBOM）与制造 BOM（MBOM），支持版本对比、替代料、损耗率与生效日期管理。",
  "roles": [
    "rd",
    "planner",
    "prod",
    "mdm",
    "admin"
  ],
  "jump": [
    {
      "label": "ECN 变更",
      "id": "ecn"
    },
    {
      "label": "工艺路线",
      "id": "routing"
    },
    {
      "label": "物料申请",
      "id": "material-apply"
    }
  ],
  "kpis": [
    {
      "label": "BOM 总数",
      "value": "12,480",
      "sub": "较上月 +2.1%"
    },
    {
      "label": "待生效版本",
      "value": "18",
      "sub": "需 ECN 审核"
    },
    {
      "label": "本月变更",
      "value": "42",
      "sub": "ECN 驱动"
    },
    {
      "label": "不一致项",
      "value": "0",
      "sub": "跨系统校验"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "BOM 编码",
      "width": 150,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "物料名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 80,
      "kind": "tag",
      "options": {
        "EBOM": "info",
        "MBOM": "primary"
      }
    },
    {
      "key": "ver",
      "label": "版本",
      "width": 70,
      "kind": "mono"
    },
    {
      "key": "qty",
      "label": "层级",
      "width": 70,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "待审批": "warning",
        "生效": "success",
        "停用": "muted"
      }
    },
    {
      "key": "owner",
      "label": "负责人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "updated",
      "label": "更新时间",
      "width": 150,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "BOM 编码",
      "key": "code"
    },
    {
      "type": "text",
      "label": "物料名称",
      "key": "name"
    },
    {
      "type": "select",
      "label": "BOM 类型",
      "options": [
        "全部",
        "EBOM",
        "MBOM"
      ]
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "待审批",
        "生效",
        "停用"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "BOM 编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成",
      "tip": "系统生成，BOM-年份-流水",
      "rule": "只读"
    },
    {
      "key": "name",
      "label": "物料名称",
      "type": "input",
      "required": true
    },
    {
      "key": "type",
      "label": "类型",
      "type": "select",
      "options": [
        "EBOM",
        "MBOM"
      ],
      "required": true
    },
    {
      "key": "ver",
      "label": "版本",
      "type": "input",
      "required": false,
      "tip": "语义化版本 V主.次",
      "rule": "变更需 ECN"
    },
    {
      "key": "qty",
      "label": "层级",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "待审批",
        "生效",
        "停用"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "负责人",
      "type": "input",
      "required": false
    },
    {
      "key": "updated",
      "label": "更新时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建 BOM",
      "perm": "rd"
    },
    {
      "key": "compare",
      "label": "版本对比",
      "perm": "rd"
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
      "key": "edit",
      "label": "编辑",
      "perm": "rd"
    },
    {
      "key": "approve",
      "label": "审批",
      "perm": "rd"
    },
    {
      "key": "obsolete",
      "label": "停用",
      "perm": "rd"
    }
  ],
  "fields": [
    [
      "BOM 编码",
      "系统生成，BOM-年份-流水",
      "只读"
    ],
    [
      "BOM 类型",
      "EBOM 由 PLM 维护，MBOM 由 ERP/工艺维护",
      "按类型分权"
    ],
    [
      "版本",
      "语义化版本 V主.次",
      "变更需 ECN"
    ],
    [
      "损耗率",
      "0~100%，按工序维护",
      "工艺工程师"
    ],
    [
      "替代料",
      "可配置优先级与替代比例",
      "研发/工艺"
    ],
    [
      "生效日期",
      "必填，不得早于审批日期",
      "审批通过后生效"
    ]
  ]
} as any
