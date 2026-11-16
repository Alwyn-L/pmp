/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "scheduler",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "调度任务",
  "desc": "分布式定时任务编排、分片执行、失败重试与告警，替代散落的 crontab。",
  "roles": [
    "admin",
    "sre",
    "data"
  ],
  "jump": [
    {
      "label": "集成与接口台账",
      "id": "integration"
    },
    {
      "label": "监控与 SLO",
      "id": "observability"
    },
    {
      "label": "数据质量与血缘",
      "id": "data-quality"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "任务编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "任务名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "cron",
      "label": "调度表达式",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "last",
      "label": "上次执行",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "cost",
      "label": "耗时",
      "width": 80,
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
        "运行中": "info"
      }
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "运行中": "info",
        "成功": "success",
        "失败": "danger",
        "暂停": "muted"
      }
    },
    {
      "key": "owner",
      "label": "负责人",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "任务编码",
      "key": "code"
    },
    {
      "type": "text",
      "label": "任务名称",
      "key": "name"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "运行中",
        "成功",
        "失败",
        "暂停"
      ],
      "key": "status"
    },
    {
      "type": "select",
      "label": "类型",
      "options": [
        "全部",
        "接口",
        "数据",
        "报表",
        "清理"
      ]
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "任务编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "任务名称",
      "type": "input",
      "required": true
    },
    {
      "key": "cron",
      "label": "调度表达式",
      "type": "input",
      "required": true
    },
    {
      "key": "last",
      "label": "上次执行",
      "type": "input",
      "required": false
    },
    {
      "key": "cost",
      "label": "耗时",
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
        "运行中"
      ],
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "运行中",
        "成功",
        "失败",
        "暂停"
      ],
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
      "label": "新建任务",
      "perm": "admin"
    },
    {
      "key": "pause",
      "label": "批量暂停",
      "perm": "admin"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "run",
      "label": "立即执行",
      "perm": "admin"
    },
    {
      "key": "log",
      "label": "执行日志"
    },
    {
      "key": "edit",
      "label": "编辑",
      "perm": "admin"
    }
  ]
} as any
