/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "purchase-order",
  "mod": "采购",
  "slug": "purchase",
  "type": "list",
  "title": "采购订单",
  "desc": "采购订单创建、审批、下达与供应商确认，支持交期变更与分批收货。",
  "roles": [
    "buyer",
    "supplier",
    "wh",
    "fin",
    "admin"
  ],
  "jump": [
    {
      "label": "ASN 收货协同",
      "id": "asn"
    },
    {
      "label": "三单匹配对账",
      "id": "reconciliation"
    },
    {
      "label": "供应商管理",
      "id": "supplier"
    }
  ],
  "kpis": [
    {
      "label": "本月订单",
      "value": "186",
      "sub": "金额 2,340 万"
    },
    {
      "label": "待确认",
      "value": "12",
      "sub": "供应商未确认"
    },
    {
      "label": "逾期",
      "value": "6",
      "sub": "需跟催"
    },
    {
      "label": "准时交付",
      "value": "92.4%",
      "sub": "较上月 +1.6%"
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
      "key": "supplier",
      "label": "供应商",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "material",
      "label": "物料",
      "width": 110,
      "kind": "mono"
    },
    {
      "key": "qty",
      "label": "数量",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "amount",
      "label": "金额(元)",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "delivery",
      "label": "交期",
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
        "待审批": "warning",
        "已下达": "info",
        "部分收货": "warning",
        "已完成": "success"
      }
    },
    {
      "key": "owner",
      "label": "采购员",
      "width": 100,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "text",
      "label": "订单号",
      "key": "code"
    },
    {
      "type": "text",
      "label": "供应商",
      "key": "supplier"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "草稿",
        "待审批",
        "已下达",
        "部分收货",
        "已完成"
      ],
      "key": "status"
    },
    {
      "type": "text",
      "label": "交期",
      "key": "delivery"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "订单号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成",
      "tip": "系统生成，PO-年份-流水",
      "rule": "只读"
    },
    {
      "key": "supplier",
      "label": "供应商",
      "type": "input",
      "required": true,
      "tip": "必须为已准入合格供应商",
      "rule": "采购员选择"
    },
    {
      "key": "material",
      "label": "物料",
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
      "key": "amount",
      "label": "金额(元)",
      "type": "input",
      "required": false
    },
    {
      "key": "delivery",
      "label": "交期",
      "type": "input",
      "required": false,
      "tip": "必填，变更需供应商确认",
      "rule": "采购员"
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "待审批",
        "已下达",
        "部分收货",
        "已完成"
      ],
      "required": false,
      "tip": "草稿/待审批/已下达/部分收货/已完成",
      "rule": "流程驱动"
    },
    {
      "key": "owner",
      "label": "采购员",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建订单",
      "perm": "buyer"
    },
    {
      "key": "approve",
      "label": "批量审批",
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
      "key": "confirm",
      "label": "确认",
      "perm": "supplier"
    },
    {
      "key": "change",
      "label": "变更交期",
      "perm": "buyer"
    },
    {
      "key": "close",
      "label": "关闭",
      "perm": "buyer"
    }
  ],
  "fields": [
    [
      "订单号",
      "系统生成，PO-年份-流水",
      "只读"
    ],
    [
      "供应商",
      "必须为已准入合格供应商",
      "采购员选择"
    ],
    [
      "价格",
      "取框架协议价或询价结果，超权限需审批",
      "采购员/财务"
    ],
    [
      "交期",
      "必填，变更需供应商确认",
      "采购员"
    ],
    [
      "状态",
      "草稿/待审批/已下达/部分收货/已完成",
      "流程驱动"
    ]
  ]
} as any
