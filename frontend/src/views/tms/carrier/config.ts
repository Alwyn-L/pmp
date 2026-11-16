/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "carrier",
  "mod": "物流",
  "slug": "tms",
  "type": "list",
  "title": "承运商与运价",
  "desc": "承运商档案、线路覆盖、运价协议与时效承诺；承运商须在 ERP 建供应商档案并映射编码。",
  "roles": [
    "logi",
    "buyer",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "运输任务",
      "id": "transport-task"
    },
    {
      "label": "运费对账",
      "id": "freight"
    },
    {
      "label": "供应商管理",
      "id": "supplier"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "承运商编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "承运商名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "mode",
      "label": "覆盖模式",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "lines",
      "label": "覆盖线路",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "level",
      "label": "评级",
      "width": 80,
      "kind": "tag",
      "options": {
        "A": "success",
        "B": "info",
        "C": "warning"
      }
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "合作中": "success",
        "暂停": "warning",
        "终止": "muted"
      }
    },
    {
      "key": "carrier",
      "label": "承运商",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "line",
      "label": "线路",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "price",
      "label": "单价",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "valid",
      "label": "有效期",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "承运商档案",
      "columns": [
        {
          "key": "code",
          "label": "承运商编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "承运商名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "mode",
          "label": "覆盖模式",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "lines",
          "label": "覆盖线路",
          "width": 140,
          "kind": "text"
        },
        {
          "key": "level",
          "label": "评级",
          "width": 80,
          "kind": "tag",
          "options": {
            "A": "success",
            "B": "info",
            "C": "warning"
          }
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "合作中": "success",
            "暂停": "warning",
            "终止": "muted"
          }
        }
      ]
    },
    {
      "name": "运价协议",
      "columns": [
        {
          "key": "code",
          "label": "协议编号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "carrier",
          "label": "承运商",
          "width": 130,
          "kind": "text"
        },
        {
          "key": "line",
          "label": "线路",
          "width": 140,
          "kind": "text"
        },
        {
          "key": "mode",
          "label": "计费方式",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "price",
          "label": "单价",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "valid",
          "label": "有效期",
          "width": 140,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
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
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "承运商编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "承运商名称",
      "type": "input",
      "required": true
    },
    {
      "key": "mode",
      "label": "覆盖模式",
      "type": "input",
      "required": true
    },
    {
      "key": "lines",
      "label": "覆盖线路",
      "type": "input",
      "required": false
    },
    {
      "key": "level",
      "label": "评级",
      "type": "select",
      "options": [
        "A",
        "B",
        "C"
      ],
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "合作中",
        "暂停",
        "终止"
      ],
      "required": false
    },
    {
      "key": "carrier",
      "label": "承运商",
      "type": "input",
      "required": false
    },
    {
      "key": "line",
      "label": "线路",
      "type": "input",
      "required": false
    },
    {
      "key": "price",
      "label": "单价",
      "type": "input",
      "required": false
    },
    {
      "key": "valid",
      "label": "有效期",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增承运商",
      "perm": "logi"
    },
    {
      "key": "price",
      "label": "新增运价",
      "perm": "logi"
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
      "perm": "logi"
    },
    {
      "key": "map",
      "label": "供应商映射",
      "perm": "fin"
    }
  ]
} as any
