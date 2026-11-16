/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "dict-param",
  "mod": "系统管理",
  "slug": "system",
  "type": "list",
  "title": "字典与参数",
  "desc": "业务字典、枚举与系统参数统一维护，变更需审批并通知订阅系统。",
  "roles": [
    "admin",
    "data"
  ],
  "jump": [
    {
      "label": "主数据管理",
      "id": "mdm"
    },
    {
      "label": "配置与密钥",
      "id": "config"
    },
    {
      "label": "审计日志",
      "id": "audit"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "字典编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "字典名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "items",
      "label": "字典项数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "维护人",
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
    },
    {
      "key": "key",
      "label": "参数键",
      "width": 180,
      "kind": "mono"
    },
    {
      "key": "value",
      "label": "参数值",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "scope",
      "label": "作用域",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "业务字典",
      "columns": [
        {
          "key": "code",
          "label": "字典编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "字典名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "items",
          "label": "字典项数",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "owner",
          "label": "维护人",
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
      "name": "系统参数",
      "columns": [
        {
          "key": "key",
          "label": "参数键",
          "width": 180,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "参数名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "value",
          "label": "参数值",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "scope",
          "label": "作用域",
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
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "字典编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "字典名称",
      "type": "input",
      "required": true
    },
    {
      "key": "items",
      "label": "字典项数",
      "type": "input",
      "required": true
    },
    {
      "key": "owner",
      "label": "维护人",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "启用",
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
      "key": "key",
      "label": "参数键",
      "type": "input",
      "required": false
    },
    {
      "key": "value",
      "label": "参数值",
      "type": "input",
      "required": false
    },
    {
      "key": "scope",
      "label": "作用域",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增字典",
      "perm": "admin"
    },
    {
      "key": "publish",
      "label": "发布",
      "perm": "admin"
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
      "perm": "admin"
    },
    {
      "key": "items",
      "label": "字典项"
    },
    {
      "key": "disable",
      "label": "停用",
      "perm": "admin"
    }
  ]
} as any
