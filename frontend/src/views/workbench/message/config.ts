/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "message",
  "mod": "工作台",
  "slug": "workbench",
  "type": "list",
  "title": "消息中心",
  "desc": "统一接收系统通知、业务提醒与运维告警，支持标记已读与按渠道查看。",
  "roles": [
    ""
  ],
  "jump": [
    {
      "label": "通知中心",
      "id": "notify"
    },
    {
      "label": "审计日志",
      "id": "audit"
    }
  ],
  "columns": [
    {
      "key": "title",
      "label": "消息标题",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 100,
      "kind": "tag",
      "options": {
        "系统通知": "info",
        "业务提醒": "primary",
        "运维告警": "danger"
      }
    },
    {
      "key": "channel",
      "label": "渠道",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "时间",
      "width": 150,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "未读": "warning",
        "已读": "muted"
      }
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "select"
    },
    {
      "type": "select",
      "label": "类型",
      "options": [
        "全部",
        "系统通知",
        "业务提醒",
        "运维告警"
      ],
      "key": "type"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "未读",
        "已读"
      ],
      "key": "status"
    },
    {
      "type": "dateRange",
      "label": "时间范围"
    }
  ],
  "formFields": [
    {
      "key": "title",
      "label": "消息标题",
      "type": "input",
      "required": true
    },
    {
      "key": "type",
      "label": "类型",
      "type": "select",
      "options": [
        "系统通知",
        "业务提醒",
        "运维告警"
      ],
      "required": true
    },
    {
      "key": "channel",
      "label": "渠道",
      "type": "input",
      "required": true
    },
    {
      "key": "time",
      "label": "时间",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "未读",
        "已读"
      ],
      "required": false
    }
  ],
  "actions": [
    {
      "key": "read",
      "label": "全部已读"
    },
    {
      "key": "setting",
      "label": "通知设置",
      "perm": "admin"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "read",
      "label": "标记已读"
    },
    {
      "key": "delete",
      "label": "删除",
      "perm": "admin"
    }
  ]
} as any
