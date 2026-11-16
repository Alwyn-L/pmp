/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "rule",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "规则引擎",
  "desc": "价格、信用、分单、补货与预警规则的可配置化管理，支持灰度与版本回滚。",
  "roles": [
    "admin",
    "planner",
    "fin"
  ],
  "jump": [
    {
      "label": "订单审核与分单",
      "id": "order-review"
    },
    {
      "label": "流程中心",
      "id": "bpm"
    },
    {
      "label": "指标平台",
      "id": "indicator"
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
      "key": "type",
      "label": "类型",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "ver",
      "label": "版本",
      "width": 70,
      "kind": "mono"
    },
    {
      "key": "hits",
      "label": "今日命中",
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
      "key": "owner",
      "label": "负责人",
      "width": 90,
      "kind": "text"
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
      "label": "规则名称",
      "key": "name"
    },
    {
      "type": "select",
      "label": "规则类型",
      "options": [
        "全部",
        "价格",
        "信用",
        "分单",
        "补货",
        "预警"
      ]
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
      "key": "type",
      "label": "类型",
      "type": "input",
      "required": true
    },
    {
      "key": "ver",
      "label": "版本",
      "type": "input",
      "required": false
    },
    {
      "key": "hits",
      "label": "今日命中",
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
      "label": "新建规则",
      "perm": "admin"
    },
    {
      "key": "simulate",
      "label": "规则仿真",
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
      "key": "publish",
      "label": "发布",
      "perm": "admin"
    },
    {
      "key": "offline",
      "label": "停用",
      "perm": "admin"
    }
  ]
} as any
