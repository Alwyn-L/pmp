/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "notify",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "通知中心",
  "desc": "消息模板、渠道（站内信/邮件/短信/企业 IM）、发送策略与回执统计。",
  "roles": [
    "admin",
    "audit"
  ],
  "jump": [
    {
      "label": "消息中心",
      "id": "message"
    },
    {
      "label": "文件中心",
      "id": "file"
    },
    {
      "label": "审计日志",
      "id": "audit"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "模板编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "模板名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "scene",
      "label": "场景",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "channel",
      "label": "渠道",
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
    },
    {
      "key": "updated",
      "label": "更新时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "provider",
      "label": "服务商",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "limit",
      "label": "限流",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "template",
      "label": "模板",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "receiver",
      "label": "接收人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "result",
      "label": "结果",
      "width": 80,
      "kind": "tag",
      "options": {
        "成功": "success",
        "失败": "danger",
        "重试中": "warning"
      }
    },
    {
      "key": "time",
      "label": "发送时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "消息模板",
      "columns": [
        {
          "key": "code",
          "label": "模板编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "模板名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "scene",
          "label": "场景",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "channel",
          "label": "渠道",
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
      "name": "渠道配置",
      "columns": [
        {
          "key": "code",
          "label": "渠道编码",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "渠道名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "provider",
          "label": "服务商",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "limit",
          "label": "限流",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "正常": "success",
            "异常": "danger"
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
      "name": "发送记录",
      "columns": [
        {
          "key": "code",
          "label": "消息编号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "template",
          "label": "模板",
          "width": 130,
          "kind": "text"
        },
        {
          "key": "receiver",
          "label": "接收人",
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
          "key": "result",
          "label": "结果",
          "width": 80,
          "kind": "tag",
          "options": {
            "成功": "success",
            "失败": "danger",
            "重试中": "warning"
          }
        },
        {
          "key": "time",
          "label": "发送时间",
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
      "label": "模板编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "模板名称",
      "type": "input",
      "required": true
    },
    {
      "key": "scene",
      "label": "场景",
      "type": "input",
      "required": true
    },
    {
      "key": "channel",
      "label": "渠道",
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
      "key": "provider",
      "label": "服务商",
      "type": "input",
      "required": false
    },
    {
      "key": "limit",
      "label": "限流",
      "type": "input",
      "required": false
    },
    {
      "key": "template",
      "label": "模板",
      "type": "input",
      "required": false
    },
    {
      "key": "receiver",
      "label": "接收人",
      "type": "input",
      "required": false
    },
    {
      "key": "result",
      "label": "结果",
      "type": "select",
      "options": [
        "成功",
        "失败",
        "重试中"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "发送时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建模板",
      "perm": "admin"
    },
    {
      "key": "test",
      "label": "发送测试",
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
      "key": "resend",
      "label": "重发",
      "perm": "admin"
    }
  ]
} as any
