/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "capacity",
  "mod": "计划",
  "slug": "plan",
  "type": "list",
  "title": "产能平衡",
  "desc": "按工作中心与周期核算产能负荷，识别瓶颈工序并给出外协、加班、调序建议。",
  "roles": [
    "planner",
    "prod",
    "admin"
  ],
  "jump": [
    {
      "label": "主生产计划",
      "id": "mps"
    },
    {
      "label": "工单管理",
      "id": "work-order"
    },
    {
      "label": "S&OP 会议",
      "id": "sop"
    }
  ],
  "columns": [
    {
      "key": "center",
      "label": "工作中心",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "period",
      "label": "周期",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "capacity",
      "label": "可用产能",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "load",
      "label": "负荷",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "rate",
      "label": "负荷率",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "bottle",
      "label": "瓶颈工序",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "正常": "success",
        "预警": "warning",
        "超载": "danger"
      }
    },
    {
      "key": "advice",
      "label": "建议",
      "width": 160,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "select",
      "label": "工作中心",
      "options": [
        "全部",
        "机加",
        "焊接",
        "喷涂",
        "总装",
        "测试",
        "包装"
      ],
      "key": "center"
    },
    {
      "type": "select",
      "label": "周期",
      "options": [
        "全部",
        "2026-11",
        "2026-12"
      ],
      "key": "period"
    }
  ],
  "formFields": [
    {
      "key": "center",
      "label": "工作中心",
      "type": "input",
      "required": true
    },
    {
      "key": "period",
      "label": "周期",
      "type": "input",
      "required": true
    },
    {
      "key": "capacity",
      "label": "可用产能",
      "type": "input",
      "required": true
    },
    {
      "key": "load",
      "label": "负荷",
      "type": "input",
      "required": false
    },
    {
      "key": "rate",
      "label": "负荷率",
      "type": "input",
      "required": false
    },
    {
      "key": "bottle",
      "label": "瓶颈工序",
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
        "超载"
      ],
      "required": false
    },
    {
      "key": "advice",
      "label": "建议",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "recalc",
      "label": "重新核算",
      "perm": "planner"
    },
    {
      "key": "export",
      "label": "导出"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "adjust",
      "label": "调整计划",
      "perm": "planner"
    },
    {
      "key": "outsource",
      "label": "申请外协",
      "perm": "planner"
    }
  ]
} as any
