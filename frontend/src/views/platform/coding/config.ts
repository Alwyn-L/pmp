/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "coding",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "编码规则",
  "desc": "物料、供应商、客户、仓库、单据号统一编码规则与号段管理，规则变更有版本与生效日期。",
  "roles": [
    "mdm",
    "admin",
    "data"
  ],
  "jump": [
    {
      "label": "主数据管理",
      "id": "mdm"
    },
    {
      "label": "物料申请",
      "id": "material-apply"
    },
    {
      "label": "集成与接口台账",
      "id": "integration"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "规则编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "规则名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "object",
      "label": "对象",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "pattern",
      "label": "规则表达式",
      "width": 200,
      "kind": "mono"
    },
    {
      "key": "seq",
      "label": "当前号段",
      "width": 100,
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
        "草稿": "muted",
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
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "规则编码",
      "key": "code"
    },
    {
      "type": "text",
      "label": "对象类型",
      "key": "keyword"
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
      "label": "规则编码",
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
      "key": "object",
      "label": "对象",
      "type": "input",
      "required": true
    },
    {
      "key": "pattern",
      "label": "规则表达式",
      "type": "input",
      "required": false
    },
    {
      "key": "seq",
      "label": "当前号段",
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
        "草稿",
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
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建规则",
      "perm": "mdm"
    },
    {
      "key": "test",
      "label": "规则测试",
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
      "key": "publish",
      "label": "发布",
      "perm": "mdm"
    },
    {
      "key": "history",
      "label": "版本历史"
    }
  ]
} as any
