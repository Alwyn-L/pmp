/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "todo",
  "mod": "工作台",
  "slug": "workbench",
  "type": "list",
  "title": "待办中心",
  "desc": "汇聚各业务系统审批与处理任务，支持按类型、紧急度与来源系统筛选，统一跳转办理。",
  "roles": [
    ""
  ],
  "jump": [
    {
      "label": "流程中心",
      "id": "bpm"
    },
    {
      "label": "采购订单",
      "id": "purchase-order"
    },
    {
      "label": "BOM 管理",
      "id": "bom"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "待办编号",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "title",
      "label": "标题",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "biz",
      "label": "业务类型",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "from",
      "label": "来源系统",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "urgent",
      "label": "紧急度",
      "width": 90,
      "kind": "tag",
      "options": {
        "高": "danger",
        "中": "warning",
        "低": "muted"
      }
    },
    {
      "key": "time",
      "label": "到达时间",
      "width": 150,
      "kind": "text"
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
    },
    {
      "key": "to",
      "label": "当前处理人",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "result",
      "label": "处理结果",
      "width": 100,
      "kind": "tag",
      "options": {
        "启用": "success",
        "生效": "success",
        "已完成": "success",
        "正常": "success",
        "通过": "success",
        "已签收": "success",
        "在线": "success",
        "成功": "success",
        "已确认": "success"
      }
    }
  ],
  "tabs": [
    {
      "name": "待我审批",
      "columns": [
        {
          "key": "code",
          "label": "待办编号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "title",
          "label": "标题",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "biz",
          "label": "业务类型",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "from",
          "label": "来源系统",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "urgent",
          "label": "紧急度",
          "width": 90,
          "kind": "tag",
          "options": {
            "高": "danger",
            "中": "warning",
            "低": "muted"
          }
        },
        {
          "key": "time",
          "label": "到达时间",
          "width": 150,
          "kind": "text"
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
      ]
    },
    {
      "name": "待我处理",
      "columns": [
        {
          "key": "code",
          "label": "待办编号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "title",
          "label": "标题",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "biz",
          "label": "业务类型",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "from",
          "label": "来源系统",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "urgent",
          "label": "紧急度",
          "width": 90,
          "kind": "tag",
          "options": {
            "高": "danger",
            "中": "warning",
            "低": "muted"
          }
        },
        {
          "key": "time",
          "label": "到达时间",
          "width": 150,
          "kind": "text"
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
      ]
    },
    {
      "name": "我发起的",
      "columns": [
        {
          "key": "code",
          "label": "单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "title",
          "label": "标题",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "biz",
          "label": "业务类型",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "to",
          "label": "当前处理人",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "time",
          "label": "提交时间",
          "width": 150,
          "kind": "text"
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
      ]
    },
    {
      "name": "已完成",
      "columns": [
        {
          "key": "code",
          "label": "单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "title",
          "label": "标题",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "biz",
          "label": "业务类型",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "result",
          "label": "处理结果",
          "width": 100,
          "kind": "tag",
          "options": {
            "启用": "success",
            "生效": "success",
            "已完成": "success",
            "正常": "success",
            "通过": "success",
            "已签收": "success",
            "在线": "success",
            "成功": "success",
            "已确认": "success"
          }
        },
        {
          "key": "time",
          "label": "完成时间",
          "width": 150,
          "kind": "text"
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "待办编号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "title",
      "label": "标题",
      "type": "input",
      "required": true
    },
    {
      "key": "biz",
      "label": "业务类型",
      "type": "input",
      "required": true
    },
    {
      "key": "from",
      "label": "来源系统",
      "type": "input",
      "required": false
    },
    {
      "key": "urgent",
      "label": "紧急度",
      "type": "select",
      "options": [
        "高",
        "中",
        "低"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "到达时间",
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
    },
    {
      "key": "to",
      "label": "当前处理人",
      "type": "input",
      "required": false
    },
    {
      "key": "result",
      "label": "处理结果",
      "type": "select",
      "options": [
        "启用",
        "生效",
        "已完成",
        "正常",
        "通过",
        "已签收",
        "在线",
        "成功",
        "已确认"
      ],
      "required": false
    }
  ],
  "actions": [
    {
      "key": "batch",
      "label": "批量办理"
    },
    {
      "key": "export",
      "label": "导出"
    }
  ],
  "rowActions": [
    {
      "key": "handle",
      "label": "办理"
    },
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "transfer",
      "label": "转办"
    }
  ]
} as any
