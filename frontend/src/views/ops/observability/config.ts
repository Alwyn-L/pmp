/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "observability",
  "mod": "运维管控",
  "slug": "ops",
  "type": "monitor",
  "title": "监控与 SLO",
  "desc": "指标、日志、链路与告警统一平台，按服务查看 SLO、错误预算与告警分级。",
  "roles": [
    "sre",
    "admin",
    "audit"
  ],
  "jump": [
    {
      "label": "集成与接口台账",
      "id": "integration"
    },
    {
      "label": "CI/CD 与发布",
      "id": "cicd"
    },
    {
      "label": "资源与成本",
      "id": "resource"
    }
  ],
  "kpis": [
    {
      "label": "可用性",
      "value": "99.97%",
      "sub": "目标 99.95%"
    },
    {
      "label": "P95 延迟",
      "value": "186 ms",
      "sub": "目标 ≤300 ms"
    },
    {
      "label": "告警",
      "value": "6",
      "sub": "P1 0 · P2 2"
    },
    {
      "label": "错误预算剩余",
      "value": "72%",
      "sub": "本周期"
    }
  ],
  "charts": [
    {
      "type": "line",
      "title": "核心接口 P95 延迟",
      "sub": "近 24 小时（ms）",
      "labels": [
        "00",
        "04",
        "08",
        "12",
        "16",
        "20",
        "24"
      ],
      "series": [
        [
          "查询",
          [
            120,
            110,
            140,
            180,
            210,
            190,
            160
          ],
          "#2563eb"
        ],
        [
          "写入",
          [
            180,
            170,
            210,
            260,
            290,
            270,
            230
          ],
          "#06b6d4"
        ]
      ]
    },
    {
      "type": "bar",
      "title": "告警分布",
      "sub": "按级别",
      "labels": [
        "P1",
        "P2",
        "P3",
        "P4"
      ],
      "data": [
        0,
        2,
        9,
        14
      ],
      "color": "#ef4444"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "告警编号",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "level",
      "label": "级别",
      "width": 70,
      "kind": "tag",
      "options": {
        "P1": "danger",
        "P2": "danger",
        "P3": "warning",
        "P4": "muted"
      }
    },
    {
      "key": "service",
      "label": "服务",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "title",
      "label": "告警内容",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "value",
      "label": "当前值",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "触发中": "danger",
        "已确认": "warning",
        "已恢复": "success"
      }
    },
    {
      "key": "time",
      "label": "时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "select",
      "label": "级别",
      "options": [
        "全部",
        "P1",
        "P2",
        "P3",
        "P4"
      ],
      "key": "level"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "触发中",
        "已确认",
        "已恢复"
      ],
      "key": "status"
    },
    {
      "type": "select",
      "label": "服务",
      "options": [
        "全部",
        "gateway",
        "mdm",
        "warehouse-service",
        "order-service"
      ],
      "key": "service"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "告警编号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "level",
      "label": "级别",
      "type": "select",
      "options": [
        "P1",
        "P2",
        "P3",
        "P4"
      ],
      "required": true
    },
    {
      "key": "service",
      "label": "服务",
      "type": "input",
      "required": true
    },
    {
      "key": "title",
      "label": "告警内容",
      "type": "textarea",
      "required": false
    },
    {
      "key": "value",
      "label": "当前值",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "触发中",
        "已确认",
        "已恢复"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "silence",
      "label": "静默",
      "perm": "sre"
    },
    {
      "key": "slo",
      "label": "SLO 配置",
      "perm": "sre"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "ack",
      "label": "确认",
      "perm": "sre"
    },
    {
      "key": "trace",
      "label": "链路"
    },
    {
      "key": "silence",
      "label": "静默",
      "perm": "sre"
    }
  ]
} as any
