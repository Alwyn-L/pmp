/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "work-order",
  "mod": "生产",
  "slug": "prod",
  "type": "list",
  "title": "工单管理",
  "desc": "工单接收、派工、开工、报工与完工入库；工单与 BOM、工艺、图纸版本强绑定。",
  "roles": [
    "prod",
    "planner",
    "qc",
    "admin"
  ],
  "jump": [
    {
      "label": "报工管理",
      "id": "report-work"
    },
    {
      "label": "质量检验",
      "id": "quality"
    },
    {
      "label": "批次追溯",
      "id": "trace"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "工单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "material",
      "label": "物料",
      "width": 110,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "产品名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "line",
      "label": "产线",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "plan",
      "label": "计划量",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "done",
      "label": "完成量",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "progress",
      "label": "进度",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待下达": "muted",
        "已下达": "info",
        "生产中": "warning",
        "已完工": "success"
      }
    },
    {
      "key": "priority",
      "label": "优先级",
      "width": 80,
      "kind": "tag",
      "options": {
        "高": "danger",
        "中": "warning",
        "低": "muted"
      }
    },
    {
      "key": "step",
      "label": "工序",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "center",
      "label": "工作中心",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "worker",
      "label": "操作工",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "start",
      "label": "计划开工",
      "width": 110,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "工单列表",
      "columns": [
        {
          "key": "code",
          "label": "工单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "material",
          "label": "物料",
          "width": 110,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "产品名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "line",
          "label": "产线",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "plan",
          "label": "计划量",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "done",
          "label": "完成量",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "progress",
          "label": "进度",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待下达": "muted",
            "已下达": "info",
            "生产中": "warning",
            "已完工": "success"
          }
        },
        {
          "key": "priority",
          "label": "优先级",
          "width": 80,
          "kind": "tag",
          "options": {
            "高": "danger",
            "中": "warning",
            "低": "muted"
          }
        }
      ]
    },
    {
      "name": "派工看板",
      "columns": [
        {
          "key": "code",
          "label": "工单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "step",
          "label": "工序",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "center",
          "label": "工作中心",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "worker",
          "label": "操作工",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "plan",
          "label": "计划量",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "start",
          "label": "计划开工",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待派工": "warning",
            "已派工": "info",
            "进行中": "warning",
            "已完成": "success"
          }
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "工单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "material",
      "label": "物料",
      "type": "input",
      "required": true
    },
    {
      "key": "name",
      "label": "产品名称",
      "type": "input",
      "required": true
    },
    {
      "key": "line",
      "label": "产线",
      "type": "input",
      "required": false
    },
    {
      "key": "plan",
      "label": "计划量",
      "type": "input",
      "required": false
    },
    {
      "key": "done",
      "label": "完成量",
      "type": "input",
      "required": false
    },
    {
      "key": "progress",
      "label": "进度",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待下达",
        "已下达",
        "生产中",
        "已完工"
      ],
      "required": false
    },
    {
      "key": "priority",
      "label": "优先级",
      "type": "select",
      "options": [
        "高",
        "中",
        "低"
      ],
      "required": false
    },
    {
      "key": "step",
      "label": "工序",
      "type": "input",
      "required": false
    },
    {
      "key": "center",
      "label": "工作中心",
      "type": "input",
      "required": false
    },
    {
      "key": "worker",
      "label": "操作工",
      "type": "input",
      "required": false
    },
    {
      "key": "start",
      "label": "计划开工",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建工单",
      "perm": "planner"
    },
    {
      "key": "dispatch",
      "label": "批量派工",
      "perm": "prod"
    },
    {
      "key": "release",
      "label": "下达",
      "perm": "planner"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "dispatch",
      "label": "派工",
      "perm": "prod"
    },
    {
      "key": "start",
      "label": "开工",
      "perm": "prod"
    },
    {
      "key": "report",
      "label": "报工",
      "perm": "prod"
    },
    {
      "key": "close",
      "label": "完工",
      "perm": "prod"
    }
  ]
} as any
