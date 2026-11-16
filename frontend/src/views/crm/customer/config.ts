/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "customer",
  "mod": "客户",
  "slug": "crm",
  "type": "list",
  "title": "客户 360",
  "desc": "客户主数据、商机、交易与售后全景视图；客户编码按渠道形态二选一，信用额度由 ERP 授信。",
  "roles": [
    "sales",
    "mdm",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "销售订单",
      "id": "sales-order"
    },
    {
      "label": "应收应付",
      "id": "receivable-payable"
    },
    {
      "label": "主数据管理",
      "id": "mdm"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "客户编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "客户名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "level",
      "label": "客户等级",
      "width": 90,
      "kind": "tag",
      "options": {
        "KA": "danger",
        "A": "success",
        "B": "info",
        "C": "muted"
      }
    },
    {
      "key": "channel",
      "label": "渠道",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "credit",
      "label": "信用额度",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "used",
      "label": "已用额度",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "正常": "success",
        "冻结": "danger"
      }
    },
    {
      "key": "customer",
      "label": "客户",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "amount",
      "label": "预计金额",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "stage",
      "label": "阶段",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "prob",
      "label": "赢单率",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "销售",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "服务类型",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "issue",
      "label": "问题描述",
      "width": 120,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "客户档案",
      "columns": [
        {
          "key": "code",
          "label": "客户编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "客户名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "level",
          "label": "客户等级",
          "width": 90,
          "kind": "tag",
          "options": {
            "KA": "danger",
            "A": "success",
            "B": "info",
            "C": "muted"
          }
        },
        {
          "key": "channel",
          "label": "渠道",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "credit",
          "label": "信用额度",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "used",
          "label": "已用额度",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "正常": "success",
            "冻结": "danger"
          }
        }
      ]
    },
    {
      "name": "商机",
      "columns": [
        {
          "key": "code",
          "label": "商机编号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "customer",
          "label": "客户",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "name",
          "label": "商机名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "amount",
          "label": "预计金额",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "stage",
          "label": "阶段",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "prob",
          "label": "赢单率",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "owner",
          "label": "销售",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
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
      "name": "售后服务",
      "columns": [
        {
          "key": "code",
          "label": "服务单号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "customer",
          "label": "客户",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "type",
          "label": "服务类型",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "issue",
          "label": "问题描述",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "owner",
          "label": "处理人",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待受理": "warning",
            "处理中": "info",
            "已解决": "success",
            "待回访": "warning"
          }
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "客户编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "客户名称",
      "type": "input",
      "required": true
    },
    {
      "key": "level",
      "label": "客户等级",
      "type": "select",
      "options": [
        "KA",
        "A",
        "B",
        "C"
      ],
      "required": true
    },
    {
      "key": "channel",
      "label": "渠道",
      "type": "input",
      "required": false
    },
    {
      "key": "credit",
      "label": "信用额度",
      "type": "input",
      "required": false
    },
    {
      "key": "used",
      "label": "已用额度",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "正常",
        "冻结"
      ],
      "required": false
    },
    {
      "key": "customer",
      "label": "客户",
      "type": "input",
      "required": false
    },
    {
      "key": "amount",
      "label": "预计金额",
      "type": "input",
      "required": false
    },
    {
      "key": "stage",
      "label": "阶段",
      "type": "input",
      "required": false
    },
    {
      "key": "prob",
      "label": "赢单率",
      "type": "input",
      "required": false
    },
    {
      "key": "owner",
      "label": "销售",
      "type": "input",
      "required": false
    },
    {
      "key": "type",
      "label": "服务类型",
      "type": "input",
      "required": false
    },
    {
      "key": "issue",
      "label": "问题描述",
      "type": "textarea",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增客户",
      "perm": "sales"
    },
    {
      "key": "merge",
      "label": "客户查重合并",
      "perm": "mdm"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看 360"
    },
    {
      "key": "edit",
      "label": "编辑",
      "perm": "sales"
    },
    {
      "key": "credit",
      "label": "信用查询",
      "perm": "fin"
    },
    {
      "key": "merge",
      "label": "合并",
      "perm": "mdm"
    }
  ]
} as any
