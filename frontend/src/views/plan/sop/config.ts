/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "sop",
  "mod": "计划",
  "slug": "plan",
  "type": "list",
  "title": "S&OP 会议",
  "desc": "需求、供应、财务三方对齐，输出共识预测、主生产计划与补货策略。",
  "roles": [
    "planner",
    "exec",
    "sales",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "需求预测",
      "id": "forecast"
    },
    {
      "label": "主生产计划",
      "id": "mps"
    },
    {
      "label": "产能平衡",
      "id": "capacity"
    }
  ],
  "flow": {
    "steps": [
      "数据准备",
      "需求评审",
      "供应评审",
      "财务评审",
      "共识发布"
    ],
    "current": 1
  },
  "columns": [
    {
      "key": "code",
      "label": "会议编号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "period",
      "label": "周期",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "topic",
      "label": "议题",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "attendee",
      "label": "参与方",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "准备中": "warning",
        "进行中": "info",
        "已发布": "success"
      }
    },
    {
      "key": "time",
      "label": "会议时间",
      "width": 150,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "会议编号",
      "key": "code"
    },
    {
      "type": "select",
      "label": "周期",
      "options": [
        "全部",
        "2026-11",
        "2026-10",
        "2026-09"
      ],
      "key": "period"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "准备中",
        "进行中",
        "已发布"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "会议编号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "period",
      "label": "周期",
      "type": "input",
      "required": true
    },
    {
      "key": "topic",
      "label": "议题",
      "type": "input",
      "required": true
    },
    {
      "key": "attendee",
      "label": "参与方",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "准备中",
        "进行中",
        "已发布"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "会议时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "发起会议",
      "perm": "planner"
    },
    {
      "key": "material",
      "label": "会议材料",
      "perm": "planner"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "minutes",
      "label": "会议纪要"
    },
    {
      "key": "publish",
      "label": "发布共识",
      "perm": "planner"
    }
  ]
} as any
