/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "gateway",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "API 网关管理",
  "desc": "统一南北向流量入口：路由、鉴权、限流、熔断、灰度与访问日志集中配置，跨系统调用不得绕过网关直连服务。",
  "roles": [
    "sre",
    "data",
    "admin"
  ],
  "jump": [
    {
      "label": "集成与接口台账",
      "id": "integration"
    },
    {
      "label": "监控与 SLO",
      "id": "observability"
    },
    {
      "label": "身份与权限",
      "id": "iam"
    }
  ],
  "kpis": [
    {
      "label": "路由总数",
      "value": "128",
      "sub": "启用 121"
    },
    {
      "label": "今日请求",
      "value": "182 万",
      "sub": "成功率 99.96%"
    },
    {
      "label": "限流触发",
      "value": "12",
      "sub": "较昨日 -4"
    },
    {
      "label": "平均延迟",
      "value": "86 ms",
      "sub": "P95 210 ms"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "路由 ID",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "path",
      "label": "路径",
      "width": 180,
      "kind": "mono"
    },
    {
      "key": "target",
      "label": "后端服务",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "auth",
      "label": "鉴权方式",
      "width": 100,
      "kind": "tag",
      "options": {
        "OIDC": "success",
        "API Key": "info",
        "免鉴权": "warning"
      }
    },
    {
      "key": "limit",
      "label": "限流阈值",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "启用": "success",
        "停用": "muted",
        "灰度": "warning"
      }
    },
    {
      "key": "owner",
      "label": "责任人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "route",
      "label": "绑定路由",
      "width": 170,
      "kind": "mono"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 90,
      "kind": "tag",
      "options": {
        "限流": "warning",
        "熔断": "danger",
        "灰度": "info"
      }
    },
    {
      "key": "rule",
      "label": "规则",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "hit",
      "label": "今日触发",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "caller",
      "label": "调用方",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "cost",
      "label": "耗时",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "时间",
      "width": 150,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "路由配置",
      "columns": [
        {
          "key": "code",
          "label": "路由 ID",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "path",
          "label": "路径",
          "width": 180,
          "kind": "mono"
        },
        {
          "key": "target",
          "label": "后端服务",
          "width": 140,
          "kind": "text"
        },
        {
          "key": "auth",
          "label": "鉴权方式",
          "width": 100,
          "kind": "tag",
          "options": {
            "OIDC": "success",
            "API Key": "info",
            "免鉴权": "warning"
          }
        },
        {
          "key": "limit",
          "label": "限流阈值",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "启用": "success",
            "停用": "muted",
            "灰度": "warning"
          }
        },
        {
          "key": "owner",
          "label": "责任人",
          "width": 90,
          "kind": "text"
        }
      ]
    },
    {
      "name": "限流与灰度",
      "columns": [
        {
          "key": "code",
          "label": "策略 ID",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "route",
          "label": "绑定路由",
          "width": 170,
          "kind": "mono"
        },
        {
          "key": "type",
          "label": "类型",
          "width": 90,
          "kind": "tag",
          "options": {
            "限流": "warning",
            "熔断": "danger",
            "灰度": "info"
          }
        },
        {
          "key": "rule",
          "label": "规则",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "hit",
          "label": "今日触发",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "生效": "success",
            "停用": "muted"
          }
        }
      ]
    },
    {
      "name": "访问日志",
      "columns": [
        {
          "key": "code",
          "label": "请求 ID",
          "width": 160,
          "kind": "mono"
        },
        {
          "key": "path",
          "label": "路径",
          "width": 180,
          "kind": "mono"
        },
        {
          "key": "caller",
          "label": "调用方",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态码",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "cost",
          "label": "耗时",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "time",
          "label": "时间",
          "width": 150,
          "kind": "text"
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "路由 ID",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成",
      "tip": "全局唯一，规则 RT-4 位流水，发布后不可修改",
      "rule": "网关唯一写入"
    },
    {
      "key": "path",
      "label": "路径",
      "type": "input",
      "required": true,
      "tip": "支持通配，前缀匹配优先，冲突校验不通过不允许发布",
      "rule": "网关配置中心"
    },
    {
      "key": "target",
      "label": "后端服务",
      "type": "input",
      "required": true
    },
    {
      "key": "auth",
      "label": "鉴权方式",
      "type": "select",
      "options": [
        "OIDC",
        "API Key",
        "免鉴权"
      ],
      "required": false,
      "tip": "OIDC / API Key / 免鉴权；免鉴权需安全审批",
      "rule": "IAM 统一签发"
    },
    {
      "key": "limit",
      "label": "限流阈值",
      "type": "input",
      "required": false,
      "tip": "按 QPS 与并发双维度，触发返回 429 并记录审计",
      "rule": "网关执行"
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "启用",
        "停用",
        "灰度"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "责任人",
      "type": "input",
      "required": false
    },
    {
      "key": "route",
      "label": "绑定路由",
      "type": "input",
      "required": false
    },
    {
      "key": "type",
      "label": "类型",
      "type": "select",
      "options": [
        "限流",
        "熔断",
        "灰度"
      ],
      "required": false
    },
    {
      "key": "rule",
      "label": "规则",
      "type": "input",
      "required": false
    },
    {
      "key": "hit",
      "label": "今日触发",
      "type": "input",
      "required": false
    },
    {
      "key": "caller",
      "label": "调用方",
      "type": "input",
      "required": false
    },
    {
      "key": "cost",
      "label": "耗时",
      "type": "input",
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
      "key": "create",
      "label": "新增路由",
      "perm": "sre"
    },
    {
      "key": "publish",
      "label": "发布变更",
      "perm": "sre"
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
      "perm": "sre"
    },
    {
      "key": "canary",
      "label": "灰度",
      "perm": "sre"
    },
    {
      "key": "offline",
      "label": "下线",
      "perm": "admin"
    }
  ],
  "fields": [
    [
      "路由 ID",
      "全局唯一，规则 RT-4 位流水，发布后不可修改",
      "网关唯一写入"
    ],
    [
      "路径",
      "支持通配，前缀匹配优先，冲突校验不通过不允许发布",
      "网关配置中心"
    ],
    [
      "鉴权方式",
      "OIDC / API Key / 免鉴权；免鉴权需安全审批",
      "IAM 统一签发"
    ],
    [
      "限流阈值",
      "按 QPS 与并发双维度，触发返回 429 并记录审计",
      "网关执行"
    ],
    [
      "灰度规则",
      "按租户/用户/比例放量，可一键回滚",
      "发布流水线，审计留痕"
    ]
  ]
} as any
