/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "receivable-payable",
  "mod": "财务协同",
  "slug": "fin",
  "type": "dashboard",
  "title": "应收应付",
  "desc": "应收、应付、账龄与资金计划统一视图，业务单据与财务凭证双向可追溯。",
  "roles": [
    "fin",
    "exec",
    "admin"
  ],
  "jump": [
    {
      "label": "发票与结算",
      "id": "invoice-settlement"
    },
    {
      "label": "三单匹配对账",
      "id": "reconciliation"
    },
    {
      "label": "运费对账",
      "id": "freight"
    }
  ],
  "kpis": [
    {
      "label": "应收账款",
      "value": "3,860 万",
      "sub": "逾期 12.4%"
    },
    {
      "label": "应付账款",
      "value": "2,140 万",
      "sub": "本月到期 680 万"
    },
    {
      "label": "逾期应收",
      "value": "478 万",
      "sub": "较上月 +3.2%"
    },
    {
      "label": "资金缺口",
      "value": "120 万",
      "sub": "未来 30 天"
    }
  ],
  "charts": [
    {
      "type": "line",
      "title": "应收应付趋势",
      "sub": "近 6 个月（万元）",
      "labels": [
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月"
      ],
      "series": [
        [
          "应收",
          [
            3600,
            3720,
            3810,
            3900,
            3940,
            3860
          ],
          "#2563eb"
        ],
        [
          "应付",
          [
            1980,
            2050,
            2090,
            2120,
            2160,
            2140
          ],
          "#06b6d4"
        ]
      ]
    },
    {
      "type": "donut",
      "title": "应收账龄",
      "sub": "按逾期天数",
      "items": [
        [
          "未到期",
          62,
          "#2563eb"
        ],
        [
          "1-30 天",
          18,
          "#06b6d4"
        ],
        [
          "31-90 天",
          12,
          "#f59e0b"
        ],
        [
          "90 天以上",
          8,
          "#ef4444"
        ]
      ]
    }
  ],
  "columns": [
    {
      "key": "customer",
      "label": "往来单位",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 80,
      "kind": "tag",
      "options": {
        "应收": "info",
        "应付": "warning"
      }
    },
    {
      "key": "amount",
      "label": "金额",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "due",
      "label": "到期日",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "overdue",
      "label": "逾期天数",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "正常": "success",
        "逾期": "danger",
        "已结清": "muted"
      }
    }
  ],
  "tabs": [],
  "filters": [],
  "formFields": [
    {
      "key": "customer",
      "label": "往来单位",
      "type": "input",
      "required": true
    },
    {
      "key": "type",
      "label": "类型",
      "type": "select",
      "options": [
        "应收",
        "应付"
      ],
      "required": true
    },
    {
      "key": "amount",
      "label": "金额",
      "type": "input",
      "required": true
    },
    {
      "key": "due",
      "label": "到期日",
      "type": "input",
      "required": false
    },
    {
      "key": "overdue",
      "label": "逾期天数",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "正常",
        "逾期",
        "已结清"
      ],
      "required": false
    }
  ]
} as any
