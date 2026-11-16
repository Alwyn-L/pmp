/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "dashboard",
  "mod": "工作台",
  "slug": "workbench",
  "type": "dashboard",
  "title": "经营驾驶舱",
  "desc": "跨域指标统一口径，展示订单履约、库存、采购、生产、物流与数据一致性六类核心指标。",
  "roles": [
    "exec",
    "admin",
    "planner",
    "fin",
    "sales"
  ],
  "jump": [
    {
      "label": "指标平台",
      "id": "indicator"
    },
    {
      "label": "自助报表",
      "id": "bi"
    },
    {
      "label": "数据质量",
      "id": "data-quality"
    }
  ],
  "kpis": [
    {
      "label": "订单履约率",
      "value": "96.8%",
      "sub": "目标 ≥95%",
      "tone": "success"
    },
    {
      "label": "库存准确率",
      "value": "99.6%",
      "sub": "目标 ≥99.5%",
      "tone": "success"
    },
    {
      "label": "采购准时率",
      "value": "92.4%",
      "sub": "较上月 +1.6%",
      "tone": "success"
    },
    {
      "label": "生产达成率",
      "value": "94.1%",
      "sub": "较上月 -0.8%",
      "tone": "warning"
    },
    {
      "label": "物流成本占比",
      "value": "3.2%",
      "sub": "目标 ≤3.5%",
      "tone": "success"
    },
    {
      "label": "主数据一致率",
      "value": "99.7%",
      "sub": "目标 ≥99.5%",
      "tone": "success"
    }
  ],
  "charts": [
    {
      "type": "line",
      "title": "订单量与履约率趋势",
      "sub": "近 12 个月",
      "labels": [
        "12月",
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月"
      ],
      "series": [
        [
          "订单量",
          [
            3200,
            2900,
            3400,
            4100,
            4600,
            4800,
            5200,
            5400,
            5600,
            5900,
            6100,
            6400
          ],
          "#2563eb"
        ],
        [
          "履约率",
          [
            92,
            93,
            92.5,
            94,
            94.5,
            95,
            95.2,
            95.8,
            96,
            96.2,
            96.5,
            96.8
          ],
          "#06b6d4"
        ]
      ]
    },
    {
      "type": "donut",
      "title": "库存结构",
      "sub": "按库龄",
      "items": [
        [
          "0-30 天",
          62,
          "#2563eb"
        ],
        [
          "31-90 天",
          23,
          "#06b6d4"
        ],
        [
          "91-180 天",
          9,
          "#f59e0b"
        ],
        [
          "180 天以上",
          6,
          "#ef4444"
        ]
      ]
    }
  ],
  "columns": [
    {
      "key": "type",
      "label": "预警类型",
      "width": 120,
      "kind": "tag",
      "options": {
        "库存": "warning",
        "交期": "danger",
        "质量": "info",
        "接口": "danger"
      }
    },
    {
      "key": "content",
      "label": "预警内容",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "责任人",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "发生时间",
      "width": 150,
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
  ],
  "tabs": [],
  "filters": [],
  "formFields": [
    {
      "key": "type",
      "label": "预警类型",
      "type": "select",
      "options": [
        "库存",
        "交期",
        "质量",
        "接口"
      ],
      "required": true
    },
    {
      "key": "content",
      "label": "预警内容",
      "type": "textarea",
      "required": false
    },
    {
      "key": "owner",
      "label": "责任人",
      "type": "input",
      "required": true
    },
    {
      "key": "time",
      "label": "发生时间",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待审批",
        "待处理",
        "待确认",
        "进行中",
        "待收货",
        "待发货",
        "待分配",
        "运行中",
        "处理中",
        "待对账"
      ],
      "required": false
    }
  ]
} as any
