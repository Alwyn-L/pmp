/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "report-work",
  "mod": "生产",
  "slug": "prod",
  "type": "list",
  "title": "报工管理",
  "desc": "按工单与工序报工，记录良品、不良品、工时与物料消耗，实时回传 ERP。",
  "roles": [
    "prod",
    "qc",
    "planner",
    "admin"
  ],
  "jump": [
    {
      "label": "工单管理",
      "id": "work-order"
    },
    {
      "label": "质量管理",
      "id": "quality"
    },
    {
      "label": "安灯异常",
      "id": "andon"
    }
  ],
  "kpis": [
    {
      "label": "今日报工",
      "value": "326",
      "sub": "条"
    },
    {
      "label": "良品率",
      "value": "98.2%",
      "sub": "较昨日 +0.3%"
    },
    {
      "label": "异常报工",
      "value": "4",
      "sub": "待处理"
    },
    {
      "label": "同步延迟",
      "value": "< 10s",
      "sub": "ERP 回传"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "报工单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "wo",
      "label": "工单号",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "step",
      "label": "工序",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "good",
      "label": "良品数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "bad",
      "label": "不良数",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "hours",
      "label": "工时",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "worker",
      "label": "报工人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "报工时间",
      "width": 150,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "待审核": "warning",
        "已同步": "success",
        "异常": "danger"
      }
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "工单号",
      "key": "wo"
    },
    {
      "type": "select",
      "label": "产线",
      "options": [
        "全部",
        "总装一线",
        "总装二线",
        "机加线"
      ]
    },
    {
      "type": "select",
      "label": "班次",
      "options": [
        "全部",
        "白班",
        "夜班"
      ]
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "报工单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "wo",
      "label": "工单号",
      "type": "input",
      "required": true
    },
    {
      "key": "step",
      "label": "工序",
      "type": "input",
      "required": true
    },
    {
      "key": "good",
      "label": "良品数",
      "type": "input",
      "required": false
    },
    {
      "key": "bad",
      "label": "不良数",
      "type": "input",
      "required": false
    },
    {
      "key": "hours",
      "label": "工时",
      "type": "input",
      "required": false
    },
    {
      "key": "worker",
      "label": "报工人",
      "type": "input",
      "required": false
    },
    {
      "key": "time",
      "label": "报工时间",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待审核",
        "已同步",
        "异常"
      ],
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增报工",
      "perm": "prod"
    },
    {
      "key": "import",
      "label": "批量导入",
      "perm": "prod"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "edit",
      "label": "修改",
      "perm": "prod"
    },
    {
      "key": "approve",
      "label": "审核",
      "perm": "prod"
    },
    {
      "key": "sync",
      "label": "重新同步",
      "perm": "admin"
    }
  ]
} as any
