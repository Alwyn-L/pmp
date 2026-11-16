/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "config",
  "mod": "运维管控",
  "slug": "ops",
  "type": "list",
  "title": "配置与密钥",
  "desc": "配置中心与密钥托管：普通配置按环境隔离、支持灰度；密钥集中托管、动态注入与轮换。",
  "roles": [
    "sre",
    "admin"
  ],
  "jump": [
    {
      "label": "CI/CD 与发布",
      "id": "cicd"
    },
    {
      "label": "身份与权限",
      "id": "iam"
    },
    {
      "label": "审计日志",
      "id": "audit"
    }
  ],
  "columns": [
    {
      "key": "key",
      "label": "配置键",
      "width": 200,
      "kind": "mono"
    },
    {
      "key": "app",
      "label": "应用",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "env",
      "label": "环境",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "value",
      "label": "当前值",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "ver",
      "label": "版本",
      "width": 70,
      "kind": "mono"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "已发布": "success",
        "待发布": "warning",
        "已回滚": "danger"
      }
    },
    {
      "key": "updated",
      "label": "更新时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "rotate",
      "label": "轮换周期",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "last",
      "label": "最近轮换",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "负责人",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "配置项",
      "columns": [
        {
          "key": "key",
          "label": "配置键",
          "width": 200,
          "kind": "mono"
        },
        {
          "key": "app",
          "label": "应用",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "env",
          "label": "环境",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "value",
          "label": "当前值",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "ver",
          "label": "版本",
          "width": 70,
          "kind": "mono"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "已发布": "success",
            "待发布": "warning",
            "已回滚": "danger"
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
      "name": "密钥管理",
      "columns": [
        {
          "key": "key",
          "label": "密钥名称",
          "width": 160,
          "kind": "mono"
        },
        {
          "key": "app",
          "label": "使用方",
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
          "key": "rotate",
          "label": "轮换周期",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "last",
          "label": "最近轮换",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "正常": "success",
            "即将过期": "warning",
            "已禁用": "muted"
          }
        },
        {
          "key": "owner",
          "label": "负责人",
          "width": 90,
          "kind": "text"
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "key",
      "label": "配置键",
      "type": "input",
      "required": true
    },
    {
      "key": "app",
      "label": "应用",
      "type": "input",
      "required": true
    },
    {
      "key": "env",
      "label": "环境",
      "type": "input",
      "required": true
    },
    {
      "key": "value",
      "label": "当前值",
      "type": "input",
      "required": false
    },
    {
      "key": "ver",
      "label": "版本",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "已发布",
        "待发布",
        "已回滚"
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
      "key": "type",
      "label": "类型",
      "type": "input",
      "required": false
    },
    {
      "key": "rotate",
      "label": "轮换周期",
      "type": "input",
      "required": false
    },
    {
      "key": "last",
      "label": "最近轮换",
      "type": "input",
      "required": false
    },
    {
      "key": "owner",
      "label": "负责人",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增配置",
      "perm": "sre"
    },
    {
      "key": "rotate",
      "label": "轮换密钥",
      "perm": "sre"
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
      "perm": "sre"
    },
    {
      "key": "publish",
      "label": "发布",
      "perm": "sre"
    },
    {
      "key": "history",
      "label": "历史版本"
    }
  ]
} as any
