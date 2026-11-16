/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "purchase-req",
  "mod": "采购",
  "slug": "purchase",
  "type": "list",
  "title": "采购申请",
  "desc": "需求部门提交采购申请，经预算与权限校验后转采购订单。",
  "roles": [
    "buyer",
    "planner",
    "wh",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "采购订单",
      "id": "purchase-order"
    },
    {
      "label": "补货计划",
      "id": "replenish"
    },
    {
      "label": "待办中心",
      "id": "todo"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "申请单号",
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
      "key": "qty",
      "label": "数量",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "demand",
      "label": "需求日期",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "dept",
      "label": "申请部门",
      "width": 110,
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
        "已转订单": "success",
        "驳回": "danger"
      }
    },
    {
      "key": "owner",
      "label": "申请人",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "申请单号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "物料编码",
      "key": "keyword"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "待审批",
        "已转订单",
        "驳回"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "申请单号",
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
      "key": "qty",
      "label": "数量",
      "type": "input",
      "required": false
    },
    {
      "key": "demand",
      "label": "需求日期",
      "type": "input",
      "required": false
    },
    {
      "key": "dept",
      "label": "申请部门",
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
        "已转订单",
        "驳回"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "申请人",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建申请",
      "perm": "planner"
    },
    {
      "key": "import",
      "label": "导入"
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
      "perm": "buyer"
    },
    {
      "key": "convert",
      "label": "转采购订单",
      "perm": "buyer"
    }
  ]
} as any
