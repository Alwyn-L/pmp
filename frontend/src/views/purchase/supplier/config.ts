/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "supplier",
  "mod": "采购",
  "slug": "purchase",
  "type": "list",
  "title": "供应商管理",
  "desc": "供应商准入、资质、绩效与结算主体一体化管理；编码由 SRM 生成，ERP 订阅建档。",
  "roles": [
    "buyer",
    "mdm",
    "fin",
    "qc",
    "audit",
    "admin"
  ],
  "jump": [
    {
      "label": "寻源询价",
      "id": "sourcing"
    },
    {
      "label": "采购订单",
      "id": "purchase-order"
    },
    {
      "label": "主数据管理",
      "id": "mdm"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "供应商编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "供应商名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "cat",
      "label": "品类",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "level",
      "label": "等级",
      "width": 80,
      "kind": "tag",
      "options": {
        "A": "success",
        "B": "info",
        "C": "warning",
        "D": "danger"
      }
    },
    {
      "key": "score",
      "label": "绩效分",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "合格": "success",
        "考察": "warning",
        "冻结": "danger"
      }
    },
    {
      "key": "owner",
      "label": "采购负责人",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "stage",
      "label": "准入阶段",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "submit",
      "label": "提交时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "quality",
      "label": "质量分",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "delivery",
      "label": "交付分",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "cost",
      "label": "成本分",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "service",
      "label": "服务分",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "total",
      "label": "总分",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "period",
      "label": "周期",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "供应商台账",
      "columns": [
        {
          "key": "code",
          "label": "供应商编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "供应商名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "cat",
          "label": "品类",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "level",
          "label": "等级",
          "width": 80,
          "kind": "tag",
          "options": {
            "A": "success",
            "B": "info",
            "C": "warning",
            "D": "danger"
          }
        },
        {
          "key": "score",
          "label": "绩效分",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "合格": "success",
            "考察": "warning",
            "冻结": "danger"
          }
        },
        {
          "key": "owner",
          "label": "采购负责人",
          "width": 100,
          "kind": "text"
        }
      ]
    },
    {
      "name": "准入审批",
      "columns": [
        {
          "key": "code",
          "label": "申请编号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "供应商名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "cat",
          "label": "品类",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "stage",
          "label": "准入阶段",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "submit",
          "label": "提交时间",
          "width": 140,
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
      "name": "绩效评价",
      "columns": [
        {
          "key": "code",
          "label": "供应商编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "供应商名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "quality",
          "label": "质量分",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "delivery",
          "label": "交付分",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "cost",
          "label": "成本分",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "service",
          "label": "服务分",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "total",
          "label": "总分",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "period",
          "label": "周期",
          "width": 90,
          "kind": "text"
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "供应商编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成",
      "tip": "SRM 生成，规则 SUP-6 位流水",
      "rule": "SRM 唯一写入"
    },
    {
      "key": "name",
      "label": "供应商名称",
      "type": "input",
      "required": true,
      "tip": "必填，工商全称",
      "rule": "SRM/主数据"
    },
    {
      "key": "cat",
      "label": "品类",
      "type": "input",
      "required": true
    },
    {
      "key": "level",
      "label": "等级",
      "type": "select",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "required": false
    },
    {
      "key": "score",
      "label": "绩效分",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "合格",
        "考察",
        "冻结"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "采购负责人",
      "type": "input",
      "required": false
    },
    {
      "key": "stage",
      "label": "准入阶段",
      "type": "input",
      "required": false
    },
    {
      "key": "submit",
      "label": "提交时间",
      "type": "input",
      "required": false
    },
    {
      "key": "quality",
      "label": "质量分",
      "type": "input",
      "required": false
    },
    {
      "key": "delivery",
      "label": "交付分",
      "type": "input",
      "required": false
    },
    {
      "key": "cost",
      "label": "成本分",
      "type": "input",
      "required": false
    },
    {
      "key": "service",
      "label": "服务分",
      "type": "input",
      "required": false
    },
    {
      "key": "total",
      "label": "总分",
      "type": "input",
      "required": false
    },
    {
      "key": "period",
      "label": "周期",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增供应商",
      "perm": "buyer"
    },
    {
      "key": "evaluate",
      "label": "发起评价",
      "perm": "buyer"
    },
    {
      "key": "export",
      "label": "导出"
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
      "perm": "buyer"
    },
    {
      "key": "approve",
      "label": "准入审批",
      "perm": "buyer"
    },
    {
      "key": "freeze",
      "label": "冻结",
      "perm": "buyer"
    }
  ],
  "fields": [
    [
      "供应商编码",
      "SRM 生成，规则 SUP-6 位流水",
      "SRM 唯一写入"
    ],
    [
      "供应商名称",
      "必填，工商全称",
      "SRM/主数据"
    ],
    [
      "准入资质",
      "营业执照、质量体系、环保资质",
      "供应商上传，采购审核"
    ],
    [
      "结算账户",
      "ERP 维护，不回写 SRM",
      "财务"
    ],
    [
      "绩效等级",
      "A/B/C/D，季度更新",
      "系统计算+人工确认"
    ]
  ]
} as any
