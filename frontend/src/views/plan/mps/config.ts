/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "mps",
  "mod": "计划",
  "slug": "plan",
  "type": "list",
  "title": "主生产计划",
  "desc": "按物料与产线编排主生产计划，校验产能与物料齐套后下达工单。",
  "roles": [
    "planner",
    "prod",
    "admin"
  ],
  "jump": [
    {
      "label": "工单管理",
      "id": "work-order"
    },
    {
      "label": "产能平衡",
      "id": "capacity"
    },
    {
      "label": "库存管理",
      "id": "inventory"
    }
  ],
  "kpis": [
    {
      "label": "计划工单",
      "value": "286",
      "sub": "本周"
    },
    {
      "label": "齐套率",
      "value": "94.2%",
      "sub": "较上周 +1.1%"
    },
    {
      "label": "冲突项",
      "value": "3",
      "sub": "产能/物料"
    },
    {
      "label": "已下达",
      "value": "210",
      "sub": "73.4%"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "计划编号",
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
      "label": "物料名称",
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
      "key": "start",
      "label": "开工日",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "end",
      "label": "完工日",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "已确认": "info",
        "已下达": "success"
      }
    },
    {
      "key": "kit",
      "label": "齐套率",
      "width": 80,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "物料编码",
      "key": "keyword"
    },
    {
      "type": "select",
      "label": "产线",
      "options": [
        "全部",
        "总装一线",
        "总装二线",
        "机加线"
      ],
      "key": "line"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "已确认",
        "已下达"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "计划编号",
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
      "label": "物料名称",
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
      "key": "start",
      "label": "开工日",
      "type": "input",
      "required": false
    },
    {
      "key": "end",
      "label": "完工日",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "已确认",
        "已下达"
      ],
      "required": false
    },
    {
      "key": "kit",
      "label": "齐套率",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建计划",
      "perm": "planner"
    },
    {
      "key": "check",
      "label": "齐套检查",
      "perm": "planner"
    },
    {
      "key": "release",
      "label": "批量下达",
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
      "key": "release",
      "label": "下达",
      "perm": "planner"
    },
    {
      "key": "split",
      "label": "拆分"
    }
  ]
} as any
