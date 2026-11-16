/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "cost",
  "mod": "财务协同",
  "slug": "fin",
  "type": "dashboard",
  "title": "成本核算",
  "desc": "按产品与期间归集直接材料、直接人工与制造费用，输出单位成本、标准成本差异与毛利分析；核算结果回写 ERP 总账。",
  "roles": [
    "fin",
    "exec",
    "prod",
    "admin"
  ],
  "jump": [
    {
      "label": "应收应付",
      "id": "receivable-payable"
    },
    {
      "label": "库存管理",
      "id": "inventory"
    },
    {
      "label": "指标平台",
      "id": "indicator"
    }
  ],
  "kpis": [
    {
      "label": "本月产品成本",
      "value": "2,860 万",
      "sub": "环比 +1.8%"
    },
    {
      "label": "制造费用",
      "value": "412 万",
      "sub": "分摊率 96%"
    },
    {
      "label": "成本差异",
      "value": "+2.3%",
      "sub": "超标准 66 万"
    },
    {
      "label": "毛利率",
      "value": "23.8%",
      "sub": "目标 ≥22%"
    }
  ],
  "charts": [
    {
      "type": "line",
      "title": "单位成本与标准成本趋势",
      "sub": "近 6 个月（元/台）",
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
          "单位成本",
          [
            3260,
            3245,
            3290,
            3310,
            3285,
            3305
          ],
          "#2563eb"
        ],
        [
          "标准成本",
          [
            3200,
            3200,
            3220,
            3220,
            3240,
            3240
          ],
          "#06b6d4"
        ]
      ]
    },
    {
      "type": "donut",
      "title": "成本构成",
      "sub": "按本月归集",
      "items": [
        [
          "直接材料",
          64,
          "#2563eb"
        ],
        [
          "直接人工",
          14,
          "#06b6d4"
        ],
        [
          "制造费用",
          16,
          "#f59e0b"
        ],
        [
          "外协加工",
          6,
          "#94a3b8"
        ]
      ]
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "产品编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "产品名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "output",
      "label": "本月产量",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "unit",
      "label": "单位成本",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "std",
      "label": "标准成本",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "diff",
      "label": "差异率",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "margin",
      "label": "毛利率",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "正常": "success",
        "超支": "warning",
        "待核算": "info"
      }
    }
  ],
  "tabs": [],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "产品编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "产品名称",
      "type": "input",
      "required": true
    },
    {
      "key": "output",
      "label": "本月产量",
      "type": "input",
      "required": true
    },
    {
      "key": "unit",
      "label": "单位成本",
      "type": "input",
      "required": false
    },
    {
      "key": "std",
      "label": "标准成本",
      "type": "input",
      "required": false
    },
    {
      "key": "diff",
      "label": "差异率",
      "type": "input",
      "required": false
    },
    {
      "key": "margin",
      "label": "毛利率",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "正常",
        "超支",
        "待核算"
      ],
      "required": false
    }
  ]
} as any
