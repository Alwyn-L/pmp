/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "indicator",
  "mod": "数据",
  "slug": "data",
  "type": "list",
  "title": "指标平台",
  "desc": "指标定义、口径、计算逻辑与责任人统一管理，指标变更走评审并留痕。",
  "roles": [
    "data",
    "exec",
    "planner",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "自助报表",
      "id": "bi"
    },
    {
      "label": "数据质量与血缘",
      "id": "data-quality"
    },
    {
      "label": "经营驾驶舱",
      "id": "dashboard"
    }
  ],
  "kpis": [
    {
      "label": "指标总数",
      "value": "286",
      "sub": "已发布 264"
    },
    {
      "label": "本月新增",
      "value": "12",
      "sub": "待评审 3"
    },
    {
      "label": "口径变更",
      "value": "5",
      "sub": "已公告"
    },
    {
      "label": "引用系统",
      "value": "14",
      "sub": "跨域指标 86"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "指标编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "指标名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "domain",
      "label": "数据域",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "unit",
      "label": "单位",
      "width": 70,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "责任人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "refs",
      "label": "引用次数",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "已发布": "success",
        "已下线": "muted"
      }
    },
    {
      "key": "updated",
      "label": "更新时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "指标编码",
      "key": "code"
    },
    {
      "type": "text",
      "label": "指标名称",
      "key": "name"
    },
    {
      "type": "select",
      "label": "数据域",
      "options": [
        "全部",
        "订单",
        "库存",
        "采购",
        "生产",
        "物流",
        "财务"
      ],
      "key": "domain"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "已发布",
        "已下线"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "指标编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "指标名称",
      "type": "input",
      "required": true
    },
    {
      "key": "domain",
      "label": "数据域",
      "type": "input",
      "required": true
    },
    {
      "key": "unit",
      "label": "单位",
      "type": "input",
      "required": false
    },
    {
      "key": "owner",
      "label": "责任人",
      "type": "input",
      "required": false
    },
    {
      "key": "refs",
      "label": "引用次数",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "已发布",
        "已下线"
      ],
      "required": false
    },
    {
      "key": "updated",
      "label": "更新时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建指标",
      "perm": "data"
    },
    {
      "key": "review",
      "label": "口径评审",
      "perm": "data"
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
      "perm": "data"
    },
    {
      "key": "lineage",
      "label": "血缘"
    },
    {
      "key": "offline",
      "label": "下线",
      "perm": "data"
    }
  ]
} as any
