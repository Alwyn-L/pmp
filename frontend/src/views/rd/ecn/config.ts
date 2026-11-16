/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "ecn",
  "mod": "研发协同",
  "slug": "rd",
  "type": "list",
  "title": "ECN 工程变更",
  "desc": "工程变更申请、影响分析、跨系统审批与分发，变更生效后同步 BOM、工艺、库存与在途订单。",
  "roles": [
    "rd",
    "planner",
    "prod",
    "qc",
    "mdm",
    "admin"
  ],
  "jump": [
    {
      "label": "BOM 管理",
      "id": "bom"
    },
    {
      "label": "工单管理",
      "id": "work-order"
    },
    {
      "label": "待办中心",
      "id": "todo"
    }
  ],
  "kpis": [
    {
      "label": "本月 ECN",
      "value": "26",
      "sub": "待审批 5"
    },
    {
      "label": "平均审批",
      "value": "2.3 天",
      "sub": "目标 ≤3 天"
    },
    {
      "label": "影响物料",
      "value": "148",
      "sub": "含在途订单 12"
    },
    {
      "label": "同步失败",
      "value": "0",
      "sub": "下游 9 系统"
    }
  ],
  "flow": {
    "steps": [
      "提交申请",
      "影响分析",
      "跨域审批",
      "发布生效",
      "下游同步"
    ],
    "current": 2
  },
  "columns": [
    {
      "key": "code",
      "label": "ECN 编号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "title",
      "label": "变更标题",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "scope",
      "label": "影响范围",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "申请人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "待审批": "warning",
        "已生效": "success",
        "驳回": "danger"
      }
    },
    {
      "key": "time",
      "label": "提交时间",
      "width": 150,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "ECN 编号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "变更标题",
      "key": "title"
    },
    {
      "type": "select",
      "label": "变更类型",
      "options": [
        "全部",
        "物料",
        "BOM",
        "工艺",
        "图纸"
      ]
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "待审批",
        "已生效",
        "驳回"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "ECN 编号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成",
      "tip": "系统生成，ECN-年份-流水",
      "rule": "只读"
    },
    {
      "key": "title",
      "label": "变更标题",
      "type": "input",
      "required": true
    },
    {
      "key": "type",
      "label": "类型",
      "type": "input",
      "required": true
    },
    {
      "key": "scope",
      "label": "影响范围",
      "type": "input",
      "required": false
    },
    {
      "key": "owner",
      "label": "申请人",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "待审批",
        "已生效",
        "驳回"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "提交时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建变更",
      "perm": "rd"
    },
    {
      "key": "impact",
      "label": "影响分析",
      "perm": "rd"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "approve",
      "label": "审批",
      "perm": "rd"
    },
    {
      "key": "timeline",
      "label": "审批轨迹"
    },
    {
      "key": "sync",
      "label": "下游同步",
      "perm": "admin"
    }
  ],
  "fields": [
    [
      "ECN 编号",
      "系统生成，ECN-年份-流水",
      "只读"
    ],
    [
      "变更类型",
      "物料/BOM/工艺/图纸",
      "申请人选择"
    ],
    [
      "影响分析",
      "自动列出受影响 BOM、工单、库存、在途订单",
      "系统生成"
    ],
    [
      "审批链",
      "研发→计划→生产→质量→主数据",
      "按影响范围动态路由"
    ],
    [
      "生效策略",
      "立即生效/指定日期/用完旧料",
      "审批人确认"
    ]
  ]
} as any
