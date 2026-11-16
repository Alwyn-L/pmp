/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "customer-portal",
  "mod": "客户",
  "slug": "crm",
  "type": "list",
  "title": "客户门户",
  "desc": "面向外部客户的统一入口：订单查询、物流轨迹、对账开票、售后提单与企业资料维护，客户账号由 IAM 托管并绑定客户编码。",
  "roles": [
    "customer",
    "sales",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "销售订单",
      "id": "sales-order"
    },
    {
      "label": "在途与签收",
      "id": "tracking"
    },
    {
      "label": "发票与结算",
      "id": "invoice-settlement"
    },
    {
      "label": "退换货 RMA",
      "id": "rma"
    }
  ],
  "kpis": [
    {
      "label": "在途订单",
      "value": "8",
      "sub": "今日送达 2"
    },
    {
      "label": "待签收",
      "value": "3",
      "sub": "超期 1"
    },
    {
      "label": "待对账",
      "value": "2",
      "sub": "金额 126 万"
    },
    {
      "label": "待开票",
      "value": "1",
      "sub": "已申请"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "订单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "product",
      "label": "产品",
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
      "key": "amount",
      "label": "金额",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "delivery",
      "label": "承诺交期",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待审核": "warning",
        "执行中": "info",
        "已发货": "info",
        "已完成": "success"
      }
    },
    {
      "key": "order",
      "label": "订单号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "carrier",
      "label": "承运商",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "node",
      "label": "当前节点",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "eta",
      "label": "预计送达",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "period",
      "label": "账期",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "invoice",
      "label": "发票",
      "width": 90,
      "kind": "tag",
      "options": {
        "未开票": "warning",
        "已开票": "success"
      }
    },
    {
      "key": "issue",
      "label": "问题描述",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "submit",
      "label": "提交时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "我的订单",
      "columns": [
        {
          "key": "code",
          "label": "订单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "product",
          "label": "产品",
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
          "key": "amount",
          "label": "金额",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "delivery",
          "label": "承诺交期",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待审核": "warning",
            "执行中": "info",
            "已发货": "info",
            "已完成": "success"
          }
        }
      ]
    },
    {
      "name": "物流轨迹",
      "columns": [
        {
          "key": "code",
          "label": "运单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "order",
          "label": "订单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "carrier",
          "label": "承运商",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "node",
          "label": "当前节点",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "eta",
          "label": "预计送达",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "运输中": "info",
            "派送中": "warning",
            "已签收": "success"
          }
        }
      ]
    },
    {
      "name": "对账与开票",
      "columns": [
        {
          "key": "code",
          "label": "对账单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "period",
          "label": "账期",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "amount",
          "label": "金额",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "invoice",
          "label": "发票",
          "width": 90,
          "kind": "tag",
          "options": {
            "未开票": "warning",
            "已开票": "success"
          }
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待确认": "warning",
            "已确认": "success"
          }
        }
      ]
    },
    {
      "name": "售后申请",
      "columns": [
        {
          "key": "code",
          "label": "服务单号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "product",
          "label": "产品",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "issue",
          "label": "问题描述",
          "width": 120,
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
            "待受理": "warning",
            "处理中": "info",
            "已解决": "success"
          }
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "订单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "product",
      "label": "产品",
      "type": "input",
      "required": true
    },
    {
      "key": "qty",
      "label": "数量",
      "type": "input",
      "required": true
    },
    {
      "key": "amount",
      "label": "金额",
      "type": "input",
      "required": false
    },
    {
      "key": "delivery",
      "label": "承诺交期",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待审核",
        "执行中",
        "已发货",
        "已完成"
      ],
      "required": false
    },
    {
      "key": "order",
      "label": "订单号",
      "type": "input",
      "required": false
    },
    {
      "key": "carrier",
      "label": "承运商",
      "type": "input",
      "required": false
    },
    {
      "key": "node",
      "label": "当前节点",
      "type": "input",
      "required": false
    },
    {
      "key": "eta",
      "label": "预计送达",
      "type": "input",
      "required": false
    },
    {
      "key": "period",
      "label": "账期",
      "type": "input",
      "required": false
    },
    {
      "key": "invoice",
      "label": "发票",
      "type": "select",
      "options": [
        "未开票",
        "已开票"
      ],
      "required": false
    },
    {
      "key": "issue",
      "label": "问题描述",
      "type": "textarea",
      "required": false
    },
    {
      "key": "submit",
      "label": "提交时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "service",
      "label": "提交售后",
      "perm": "customer"
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
      "key": "confirm",
      "label": "确认收货",
      "perm": "customer"
    },
    {
      "key": "invoice",
      "label": "下载发票"
    }
  ],
  "fields": [
    [
      "客户编码",
      "门户不生成编码，注册查重通过后由 ERP 编码规则分配",
      "ERP 唯一写入，门户只读"
    ],
    [
      "可见订单",
      "仅可查看绑定客户编码的订单，数据范围由 IAM 下发",
      "IAM 数据权限，越权返回 403"
    ],
    [
      "物流轨迹",
      "承运商轨迹每 30 分钟同步，签收后归档",
      "TMS 推送，门户只读"
    ],
    [
      "对账金额",
      "以 ERP 应收为准，客户可在门户发起异议",
      "ERP 唯一口径"
    ],
    [
      "售后单",
      "门户提单自动生成 RMA 草稿并进入客服受理",
      "门户可写，售后系统受理"
    ]
  ]
} as any
