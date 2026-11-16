/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "mdm",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "主数据管理",
  "desc": "物料、供应商、客户、仓库与组织的唯一权威源；统一编码、准入、变更、分发与一致性核对。",
  "roles": [
    "mdm",
    "admin",
    "data",
    "audit"
  ],
  "jump": [
    {
      "label": "编码规则",
      "id": "coding"
    },
    {
      "label": "集成与接口台账",
      "id": "integration"
    },
    {
      "label": "数据质量与血缘",
      "id": "data-quality"
    }
  ],
  "kpis": [
    {
      "label": "物料",
      "value": "18,642",
      "sub": "重复 0"
    },
    {
      "label": "供应商",
      "value": "1,286",
      "sub": "待准入 12"
    },
    {
      "label": "客户",
      "value": "2,480",
      "sub": "重复 3"
    },
    {
      "label": "仓库/库位",
      "value": "86 / 4,210",
      "sub": "一致率 99.7%"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "物料编码",
      "width": 130,
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
      "width": 90,
      "kind": "text"
    },
    {
      "key": "spec",
      "label": "规格",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "unit",
      "label": "单位",
      "width": 60,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "启用": "success",
        "冻结": "warning",
        "停用": "muted"
      }
    },
    {
      "key": "updated",
      "label": "更新时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "cat",
      "label": "品类",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "settle",
      "label": "结算主体",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "source",
      "label": "权威源",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "channel",
      "label": "渠道",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "dup",
      "label": "查重",
      "width": 80,
      "kind": "tag",
      "options": {
        "通过": "success",
        "疑似": "warning",
        "重复": "danger"
      }
    },
    {
      "key": "locs",
      "label": "库位数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "parent",
      "label": "上级组织",
      "width": 130,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "物料主数据",
      "columns": [
        {
          "key": "code",
          "label": "物料编码",
          "width": 130,
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
          "width": 90,
          "kind": "text"
        },
        {
          "key": "spec",
          "label": "规格",
          "width": 130,
          "kind": "text"
        },
        {
          "key": "unit",
          "label": "单位",
          "width": 60,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "启用": "success",
            "冻结": "warning",
            "停用": "muted"
          }
        },
        {
          "key": "updated",
          "label": "更新时间",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "供应商主数据",
      "columns": [
        {
          "key": "code",
          "label": "供应商编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "供应商名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "cat",
          "label": "品类",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "settle",
          "label": "结算主体",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "合格": "success",
            "考察": "warning",
            "冻结": "danger"
          }
        },
        {
          "key": "source",
          "label": "权威源",
          "width": 90,
          "kind": "text"
        }
      ]
    },
    {
      "name": "客户主数据",
      "columns": [
        {
          "key": "code",
          "label": "客户编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "客户名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "channel",
          "label": "渠道",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "source",
          "label": "权威源",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "dup",
          "label": "查重",
          "width": 80,
          "kind": "tag",
          "options": {
            "通过": "success",
            "疑似": "warning",
            "重复": "danger"
          }
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "正常": "success",
            "冻结": "danger"
          }
        }
      ]
    },
    {
      "name": "仓库与库位",
      "columns": [
        {
          "key": "code",
          "label": "仓库编码",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "仓库名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "type",
          "label": "类型",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "locs",
          "label": "库位数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "source",
          "label": "权威源",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "启用": "success",
            "停用": "muted"
          }
        },
        {
          "key": "updated",
          "label": "更新时间",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "组织主数据",
      "columns": [
        {
          "key": "code",
          "label": "组织编码",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "组织名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "parent",
          "label": "上级组织",
          "width": 130,
          "kind": "text"
        },
        {
          "key": "type",
          "label": "类型",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "source",
          "label": "权威源",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "启用": "success",
            "停用": "muted"
          }
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "物料编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成",
      "tip": "ERP 统一生成，PLM 只持临时码",
      "rule": "仅 ERP/MDM 写入"
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
      "type": "input",
      "required": true
    },
    {
      "key": "spec",
      "label": "规格",
      "type": "input",
      "required": false
    },
    {
      "key": "unit",
      "label": "单位",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "启用",
        "冻结",
        "停用"
      ],
      "required": false
    },
    {
      "key": "updated",
      "label": "更新时间",
      "type": "input",
      "required": false
    },
    {
      "key": "cat",
      "label": "品类",
      "type": "input",
      "required": false
    },
    {
      "key": "settle",
      "label": "结算主体",
      "type": "input",
      "required": false
    },
    {
      "key": "source",
      "label": "权威源",
      "type": "input",
      "required": false
    },
    {
      "key": "channel",
      "label": "渠道",
      "type": "input",
      "required": false
    },
    {
      "key": "dup",
      "label": "查重",
      "type": "select",
      "options": [
        "通过",
        "疑似",
        "重复"
      ],
      "required": false
    },
    {
      "key": "locs",
      "label": "库位数",
      "type": "input",
      "required": false
    },
    {
      "key": "parent",
      "label": "上级组织",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增主数据",
      "perm": "mdm"
    },
    {
      "key": "distribute",
      "label": "重新分发",
      "perm": "mdm"
    },
    {
      "key": "check",
      "label": "一致性核对",
      "perm": "mdm"
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
      "perm": "mdm"
    },
    {
      "key": "history",
      "label": "变更历史"
    },
    {
      "key": "distribute",
      "label": "分发",
      "perm": "mdm"
    },
    {
      "key": "freeze",
      "label": "冻结",
      "perm": "mdm"
    }
  ],
  "fields": [
    [
      "物料编码",
      "ERP 统一生成，PLM 只持临时码",
      "仅 ERP/MDM 写入"
    ],
    [
      "供应商编码",
      "SRM 生成，ERP 订阅",
      "仅 SRM 写入"
    ],
    [
      "客户编码",
      "B2B 取 ERP、B2C 取 CRM/CDP",
      "按渠道二选一"
    ],
    [
      "仓库编码",
      "ERP 生成并下发 WMS",
      "ERP 唯一写入"
    ],
    [
      "库位编码",
      "WMS 生成并回传映射",
      "WMS 唯一写入"
    ],
    [
      "分发机制",
      "实时增量 + 每日全量核对",
      "系统自动"
    ]
  ]
} as any
