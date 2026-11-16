/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "data-quality",
  "mod": "数据",
  "slug": "data",
  "type": "list",
  "title": "数据质量与血缘",
  "desc": "稽核规则、质量评分、问题工单、字段级血缘与数据服务 API 统一管理。",
  "roles": [
    "data",
    "admin",
    "audit"
  ],
  "jump": [
    {
      "label": "指标平台",
      "id": "indicator"
    },
    {
      "label": "主数据管理",
      "id": "mdm"
    },
    {
      "label": "集成与接口台账",
      "id": "integration"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "规则编号",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "规则名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "table",
      "label": "对象",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "rule",
      "label": "规则",
      "width": 160,
      "kind": "text"
    },
    {
      "key": "pass",
      "label": "通过率",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "正常": "success",
        "预警": "warning",
        "异常": "danger"
      }
    },
    {
      "key": "owner",
      "label": "责任人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "object",
      "label": "对象",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "diff",
      "label": "差异数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "创建时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "source",
      "label": "源表",
      "width": 150,
      "kind": "mono"
    },
    {
      "key": "field",
      "label": "源字段",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "target",
      "label": "目标表",
      "width": 150,
      "kind": "mono"
    },
    {
      "key": "target_field",
      "label": "目标字段",
      "width": 110,
      "kind": "mono"
    },
    {
      "key": "job",
      "label": "加工作业",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "level",
      "label": "层级",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "path",
      "label": "API 路径",
      "width": 180,
      "kind": "mono"
    },
    {
      "key": "caller",
      "label": "调用方",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "qps",
      "label": "QPS",
      "width": 70,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "质量规则",
      "columns": [
        {
          "key": "code",
          "label": "规则编号",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "规则名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "table",
          "label": "对象",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "rule",
          "label": "规则",
          "width": 160,
          "kind": "text"
        },
        {
          "key": "pass",
          "label": "通过率",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "正常": "success",
            "预警": "warning",
            "异常": "danger"
          }
        },
        {
          "key": "owner",
          "label": "责任人",
          "width": 90,
          "kind": "text"
        }
      ]
    },
    {
      "name": "稽核工单",
      "columns": [
        {
          "key": "code",
          "label": "工单号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "rule",
          "label": "触发规则",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "object",
          "label": "对象",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "diff",
          "label": "差异数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "owner",
          "label": "处理人",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待处理": "warning",
            "处理中": "info",
            "已修复": "success"
          }
        },
        {
          "key": "time",
          "label": "创建时间",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "字段血缘",
      "columns": [
        {
          "key": "source",
          "label": "源表",
          "width": 150,
          "kind": "mono"
        },
        {
          "key": "field",
          "label": "源字段",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "target",
          "label": "目标表",
          "width": 150,
          "kind": "mono"
        },
        {
          "key": "target_field",
          "label": "目标字段",
          "width": 110,
          "kind": "mono"
        },
        {
          "key": "job",
          "label": "加工作业",
          "width": 140,
          "kind": "text"
        },
        {
          "key": "level",
          "label": "层级",
          "width": 80,
          "kind": "text"
        }
      ]
    },
    {
      "name": "数据服务",
      "columns": [
        {
          "key": "code",
          "label": "服务编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "服务名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "path",
          "label": "API 路径",
          "width": 180,
          "kind": "mono"
        },
        {
          "key": "caller",
          "label": "调用方",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "qps",
          "label": "QPS",
          "width": 70,
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
          "key": "owner",
          "label": "责任人",
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
      "label": "规则编号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "规则名称",
      "type": "input",
      "required": true
    },
    {
      "key": "table",
      "label": "对象",
      "type": "input",
      "required": true
    },
    {
      "key": "rule",
      "label": "规则",
      "type": "input",
      "required": false
    },
    {
      "key": "pass",
      "label": "通过率",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "正常",
        "预警",
        "异常"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "责任人",
      "type": "input",
      "required": false
    },
    {
      "key": "object",
      "label": "对象",
      "type": "input",
      "required": false
    },
    {
      "key": "diff",
      "label": "差异数",
      "type": "input",
      "required": false
    },
    {
      "key": "time",
      "label": "创建时间",
      "type": "input",
      "required": false
    },
    {
      "key": "source",
      "label": "源表",
      "type": "input",
      "required": false
    },
    {
      "key": "field",
      "label": "源字段",
      "type": "input",
      "required": false
    },
    {
      "key": "target",
      "label": "目标表",
      "type": "input",
      "required": false
    },
    {
      "key": "target_field",
      "label": "目标字段",
      "type": "input",
      "required": false
    },
    {
      "key": "job",
      "label": "加工作业",
      "type": "input",
      "required": false
    },
    {
      "key": "level",
      "label": "层级",
      "type": "input",
      "required": false
    },
    {
      "key": "path",
      "label": "API 路径",
      "type": "input",
      "required": false
    },
    {
      "key": "caller",
      "label": "调用方",
      "type": "input",
      "required": false
    },
    {
      "key": "qps",
      "label": "QPS",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建规则",
      "perm": "data"
    },
    {
      "key": "run",
      "label": "立即稽核",
      "perm": "data"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "run",
      "label": "执行",
      "perm": "data"
    },
    {
      "key": "assign",
      "label": "派单",
      "perm": "data"
    }
  ]
} as any
