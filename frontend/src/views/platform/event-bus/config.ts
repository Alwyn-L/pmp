/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "event-bus",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "消息总线",
  "desc": "事件主题、订阅关系、死信重试与积压监控；业务事件采用 Outbox 模式发布，保证至少一次投递与幂等消费。",
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
      "label": "调度任务",
      "id": "scheduler"
    }
  ],
  "kpis": [
    {
      "label": "主题总数",
      "value": "46",
      "sub": "启用 44"
    },
    {
      "label": "今日事件",
      "value": "96 万",
      "sub": "峰值 2.4 万/分"
    },
    {
      "label": "死信消息",
      "value": "3",
      "sub": "待重放"
    },
    {
      "label": "消费积压",
      "value": "1.2 万",
      "sub": "关注 2 组"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "主题",
      "width": 190,
      "kind": "mono"
    },
    {
      "key": "domain",
      "label": "所属域",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "producer",
      "label": "生产方",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "consumers",
      "label": "订阅方",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "tps",
      "label": "峰值 TPS",
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
        "积压": "warning",
        "停用": "muted"
      }
    },
    {
      "key": "topic",
      "label": "主题",
      "width": 190,
      "kind": "mono"
    },
    {
      "key": "reason",
      "label": "失败原因",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "retry",
      "label": "重试次数",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "入队时间",
      "width": 150,
      "kind": "text"
    },
    {
      "key": "group",
      "label": "消费组",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "lag",
      "label": "积压量",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "rate",
      "label": "消费速率",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "责任人",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "主题与订阅",
      "columns": [
        {
          "key": "code",
          "label": "主题",
          "width": 190,
          "kind": "mono"
        },
        {
          "key": "domain",
          "label": "所属域",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "producer",
          "label": "生产方",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "consumers",
          "label": "订阅方",
          "width": 130,
          "kind": "text"
        },
        {
          "key": "tps",
          "label": "峰值 TPS",
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
            "积压": "warning",
            "停用": "muted"
          }
        }
      ]
    },
    {
      "name": "死信队列",
      "columns": [
        {
          "key": "code",
          "label": "消息 ID",
          "width": 160,
          "kind": "mono"
        },
        {
          "key": "topic",
          "label": "主题",
          "width": 190,
          "kind": "mono"
        },
        {
          "key": "reason",
          "label": "失败原因",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "retry",
          "label": "重试次数",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "time",
          "label": "入队时间",
          "width": 150,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待重放": "warning",
            "已重放": "success",
            "已丢弃": "danger"
          }
        }
      ]
    },
    {
      "name": "消费监控",
      "columns": [
        {
          "key": "group",
          "label": "消费组",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "topic",
          "label": "订阅主题",
          "width": 190,
          "kind": "mono"
        },
        {
          "key": "lag",
          "label": "积压量",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "rate",
          "label": "消费速率",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "owner",
          "label": "责任人",
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
            "延迟": "warning",
            "停止": "danger"
          }
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "主题",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "domain",
      "label": "所属域",
      "type": "input",
      "required": true
    },
    {
      "key": "producer",
      "label": "生产方",
      "type": "input",
      "required": true,
      "tip": "必须为已登记系统，禁止匿名发布",
      "rule": "集成台账校验"
    },
    {
      "key": "consumers",
      "label": "订阅方",
      "type": "input",
      "required": false,
      "tip": "订阅关系确定消费语义，新增需评审",
      "rule": "订阅配置，审计留痕"
    },
    {
      "key": "tps",
      "label": "峰值 TPS",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "正常",
        "积压",
        "停用"
      ],
      "required": false
    },
    {
      "key": "topic",
      "label": "主题",
      "type": "input",
      "required": false
    },
    {
      "key": "reason",
      "label": "失败原因",
      "type": "input",
      "required": false
    },
    {
      "key": "retry",
      "label": "重试次数",
      "type": "input",
      "required": false
    },
    {
      "key": "time",
      "label": "入队时间",
      "type": "input",
      "required": false
    },
    {
      "key": "group",
      "label": "消费组",
      "type": "input",
      "required": false
    },
    {
      "key": "lag",
      "label": "积压量",
      "type": "input",
      "required": false
    },
    {
      "key": "rate",
      "label": "消费速率",
      "type": "input",
      "required": false
    },
    {
      "key": "owner",
      "label": "责任人",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建主题",
      "perm": "sre"
    },
    {
      "key": "replay",
      "label": "死信重放",
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
      "key": "subscribe",
      "label": "订阅配置",
      "perm": "sre"
    },
    {
      "key": "replay",
      "label": "重放",
      "perm": "sre"
    },
    {
      "key": "pause",
      "label": "暂停",
      "perm": "admin"
    }
  ],
  "fields": [
    [
      "主题名",
      "命名规范 域.实体.动作.v版本，全局唯一",
      "消息总线唯一写入"
    ],
    [
      "生产方",
      "必须为已登记系统，禁止匿名发布",
      "集成台账校验"
    ],
    [
      "订阅方",
      "订阅关系确定消费语义，新增需评审",
      "订阅配置，审计留痕"
    ],
    [
      "死信",
      "重试上限 5 次，人工重放需二次确认",
      "总线托管，运维执行"
    ],
    [
      "积压告警",
      "消费组积压超过阈值触发告警并升级",
      "可观测平台统一告警"
    ]
  ]
} as any
