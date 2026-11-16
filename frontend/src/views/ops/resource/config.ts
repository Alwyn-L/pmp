/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "resource",
  "mod": "运维管控",
  "slug": "ops",
  "type": "dashboard",
  "title": "资源与成本",
  "desc": "容器资源用量、配额、闲置识别与成本分摊，按域/环境查看 CPU、内存与费用。",
  "roles": [
    "sre",
    "admin",
    "exec"
  ],
  "jump": [
    {
      "label": "CI/CD 与发布",
      "id": "cicd"
    },
    {
      "label": "监控与 SLO",
      "id": "observability"
    },
    {
      "label": "配置与密钥",
      "id": "config"
    }
  ],
  "kpis": [
    {
      "label": "集群节点",
      "value": "18",
      "sub": "可用 17"
    },
    {
      "label": "CPU 使用率",
      "value": "58%",
      "sub": "水位正常"
    },
    {
      "label": "内存使用率",
      "value": "64%",
      "sub": "水位正常"
    },
    {
      "label": "月度成本",
      "value": "42.6 万",
      "sub": "环比 -3.1%"
    }
  ],
  "charts": [
    {
      "type": "bar",
      "title": "各域资源成本（万元）",
      "sub": "2026 年 11 月",
      "labels": [
        "仓储",
        "履约",
        "采购",
        "生产",
        "数据",
        "公共"
      ],
      "data": [
        8.6,
        7.2,
        5.4,
        6.8,
        9.2,
        5.4
      ],
      "color": "#2563eb"
    },
    {
      "type": "donut",
      "title": "资源类型占比",
      "sub": "按成本",
      "items": [
        [
          "计算",
          52,
          "#2563eb"
        ],
        [
          "存储",
          24,
          "#06b6d4"
        ],
        [
          "数据库",
          16,
          "#f59e0b"
        ],
        [
          "网络",
          8,
          "#94a3b8"
        ]
      ]
    }
  ],
  "columns": [
    {
      "key": "domain",
      "label": "业务域",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "namespace",
      "label": "命名空间",
      "width": 150,
      "kind": "mono"
    },
    {
      "key": "cpu",
      "label": "CPU 请求/使用",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "mem",
      "label": "内存请求/使用",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "cost",
      "label": "月成本(元)",
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
        "偏高": "warning",
        "闲置": "muted"
      }
    }
  ],
  "tabs": [],
  "filters": [],
  "formFields": [
    {
      "key": "domain",
      "label": "业务域",
      "type": "input",
      "required": true
    },
    {
      "key": "namespace",
      "label": "命名空间",
      "type": "input",
      "required": true
    },
    {
      "key": "cpu",
      "label": "CPU 请求/使用",
      "type": "input",
      "required": true
    },
    {
      "key": "mem",
      "label": "内存请求/使用",
      "type": "input",
      "required": false
    },
    {
      "key": "cost",
      "label": "月成本(元)",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "正常",
        "偏高",
        "闲置"
      ],
      "required": false
    }
  ]
} as any
