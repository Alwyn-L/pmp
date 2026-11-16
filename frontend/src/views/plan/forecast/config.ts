/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "forecast",
  "mod": "计划",
  "slug": "plan",
  "type": "list",
  "title": "需求预测",
  "desc": "基于历史销售、在手订单与市场因素生成预测版本，支持人工调整与准确率回溯。",
  "roles": [
    "planner",
    "exec",
    "sales",
    "data",
    "admin"
  ],
  "jump": [
    {
      "label": "S&OP 会议",
      "id": "sop"
    },
    {
      "label": "主生产计划",
      "id": "mps"
    },
    {
      "label": "自助报表",
      "id": "bi"
    }
  ],
  "kpis": [
    {
      "label": "预测准确率",
      "value": "88.6%",
      "sub": "目标 ≥85%"
    },
    {
      "label": "预测版本",
      "value": "12",
      "sub": "当前 V12"
    },
    {
      "label": "待确认",
      "value": "3",
      "sub": "需 S&OP 确认"
    },
    {
      "label": "偏差预警",
      "value": "2",
      "sub": "偏差 >15%"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "物料编码",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "物料名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "period",
      "label": "预测周期",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "qty",
      "label": "预测数量",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "actual",
      "label": "实际销量",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "acc",
      "label": "准确率",
      "width": 80,
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
      "width": 90,
      "kind": "tag",
      "options": {
        "待审批": "warning",
        "待处理": "warning",
        "待确认": "warning",
        "进行中": "info",
        "待收货": "info",
        "待发货": "info",
        "待分配": "info",
        "运行中": "info",
        "处理中": "info",
        "待对账": "warning"
      }
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "物料编码",
      "key": "code"
    },
    {
      "type": "select",
      "label": "预测周期",
      "options": [
        "全部",
        "周",
        "月",
        "季"
      ],
      "key": "period"
    },
    {
      "type": "select",
      "label": "版本",
      "options": [
        "全部",
        "V12",
        "V11",
        "V10"
      ],
      "key": "ver"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "物料编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "物料名称",
      "type": "input",
      "required": true
    },
    {
      "key": "period",
      "label": "预测周期",
      "type": "input",
      "required": true
    },
    {
      "key": "qty",
      "label": "预测数量",
      "type": "input",
      "required": false
    },
    {
      "key": "actual",
      "label": "实际销量",
      "type": "input",
      "required": false
    },
    {
      "key": "acc",
      "label": "准确率",
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
        "待审批",
        "待处理",
        "待确认",
        "进行中",
        "待收货",
        "待发货",
        "待分配",
        "运行中",
        "处理中",
        "待对账"
      ],
      "required": false
    }
  ],
  "actions": [
    {
      "key": "run",
      "label": "运行预测",
      "perm": "planner"
    },
    {
      "key": "adjust",
      "label": "人工调整",
      "perm": "planner"
    },
    {
      "key": "publish",
      "label": "发布版本",
      "perm": "planner"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "edit",
      "label": "调整",
      "perm": "planner"
    },
    {
      "key": "history",
      "label": "历史版本"
    }
  ]
} as any
