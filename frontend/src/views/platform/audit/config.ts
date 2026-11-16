/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "audit",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "审计日志",
  "desc": "登录、权限、主数据、业务单据与配置变更全量留痕，支持按人、单号、时间检索，留存 ≥180 天。",
  "roles": [
    "audit",
    "admin",
    "sre"
  ],
  "jump": [
    {
      "label": "身份与权限",
      "id": "iam"
    },
    {
      "label": "配置与密钥",
      "id": "config"
    },
    {
      "label": "数据质量与血缘",
      "id": "data-quality"
    }
  ],
  "columns": [
    {
      "key": "x_id",
      "label": "日志编号",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "user",
      "label": "操作人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "action",
      "label": "操作类型",
      "width": 90,
      "kind": "tag",
      "options": {
        "登录": "info",
        "新增": "primary",
        "修改": "warning",
        "删除": "danger",
        "审批": "success",
        "导出": "muted"
      }
    },
    {
      "key": "object",
      "label": "对象",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "detail",
      "label": "详情",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "ip",
      "label": "IP",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "result",
      "label": "结果",
      "width": 70,
      "kind": "tag",
      "options": {
        "成功": "success",
        "失败": "danger"
      }
    },
    {
      "key": "time",
      "label": "时间",
      "width": 150,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "操作人",
      "key": "user"
    },
    {
      "type": "text",
      "label": "对象/单号",
      "key": "keyword"
    },
    {
      "type": "select",
      "label": "操作类型",
      "options": [
        "全部",
        "登录",
        "查询",
        "新增",
        "修改",
        "删除",
        "审批",
        "导出"
      ],
      "key": "action"
    },
    {
      "type": "select",
      "label": "结果",
      "options": [
        "全部",
        "成功",
        "失败"
      ],
      "key": "result"
    },
    {
      "type": "dateRange",
      "label": "时间范围"
    }
  ],
  "formFields": [
    {
      "key": "x_id",
      "label": "日志编号",
      "type": "input",
      "required": true
    },
    {
      "key": "user",
      "label": "操作人",
      "type": "input",
      "required": true
    },
    {
      "key": "action",
      "label": "操作类型",
      "type": "select",
      "options": [
        "登录",
        "新增",
        "修改",
        "删除",
        "审批",
        "导出"
      ],
      "required": true
    },
    {
      "key": "object",
      "label": "对象",
      "type": "input",
      "required": false
    },
    {
      "key": "detail",
      "label": "详情",
      "type": "input",
      "required": false
    },
    {
      "key": "ip",
      "label": "IP",
      "type": "input",
      "required": false
    },
    {
      "key": "result",
      "label": "结果",
      "type": "select",
      "options": [
        "成功",
        "失败"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "export",
      "label": "导出日志",
      "perm": "audit"
    },
    {
      "key": "policy",
      "label": "留存策略",
      "perm": "admin"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看详情"
    },
    {
      "key": "trace",
      "label": "关联链路"
    }
  ]
} as any
