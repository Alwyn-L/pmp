/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "stocktake",
  "mod": "仓储",
  "slug": "wms",
  "type": "list",
  "title": "盘点管理",
  "desc": "全盘、抽盘与循环盘点，差异自动生成工单并进入审批与账务调整。",
  "roles": [
    "wh",
    "fin",
    "audit",
    "admin"
  ],
  "jump": [
    {
      "label": "库存管理",
      "id": "inventory"
    },
    {
      "label": "待办中心",
      "id": "todo"
    },
    {
      "label": "审计日志",
      "id": "audit"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "盘点单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "wh",
      "label": "仓库",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "盘点类型",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "scope",
      "label": "范围",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "diff",
      "label": "差异项",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "amount",
      "label": "差异金额",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待盘点": "warning",
        "盘点中": "info",
        "待审核": "warning",
        "已调整": "success"
      }
    },
    {
      "key": "owner",
      "label": "负责人",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "盘点单号",
      "key": "code"
    },
    {
      "type": "select",
      "label": "仓库",
      "options": [
        "全部",
        "华东成品仓",
        "华南原料仓",
        "线边仓"
      ],
      "key": "wh"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "待盘点",
        "盘点中",
        "待审核",
        "已调整"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "盘点单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "wh",
      "label": "仓库",
      "type": "input",
      "required": true
    },
    {
      "key": "type",
      "label": "盘点类型",
      "type": "input",
      "required": true
    },
    {
      "key": "scope",
      "label": "范围",
      "type": "input",
      "required": false
    },
    {
      "key": "diff",
      "label": "差异项",
      "type": "input",
      "required": false
    },
    {
      "key": "amount",
      "label": "差异金额",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待盘点",
        "盘点中",
        "待审核",
        "已调整"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "负责人",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建盘点",
      "perm": "wh"
    },
    {
      "key": "assign",
      "label": "分配任务",
      "perm": "wh"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "input",
      "label": "录入实盘",
      "perm": "wh"
    },
    {
      "key": "diff",
      "label": "差异处理",
      "perm": "wh"
    },
    {
      "key": "approve",
      "label": "审核调整",
      "perm": "fin"
    }
  ]
} as any
