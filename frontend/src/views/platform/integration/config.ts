/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "integration",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "集成与接口台账",
  "desc": "接口台账、连接器、调用日志与失败告警；所有跨系统调用经网关统一治理。",
  "roles": [
    "admin",
    "sre",
    "data",
    "audit"
  ],
  "jump": [
    {
      "label": "主数据管理",
      "id": "mdm"
    },
    {
      "label": "监控与 SLO",
      "id": "observability"
    },
    {
      "label": "审计日志",
      "id": "audit"
    }
  ],
  "kpis": [
    {
      "label": "接口总数",
      "value": "86",
      "sub": "主数据 12"
    },
    {
      "label": "今日调用",
      "value": "182 万",
      "sub": "成功率 99.96%"
    },
    {
      "label": "失败告警",
      "value": "6",
      "sub": "已恢复 4"
    },
    {
      "label": "平均延迟",
      "value": "86 ms",
      "sub": "P95 240 ms"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "接口编号",
      "width": 150,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "接口名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "source",
      "label": "源系统",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "target",
      "label": "目标系统",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "mode",
      "label": "方式",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "sla",
      "label": "SLA",
      "width": 90,
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
        "启用": "success",
        "停用": "muted",
        "退役": "muted"
      }
    },
    {
      "key": "system",
      "label": "对接系统",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "protocol",
      "label": "协议",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "updated",
      "label": "更新时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "api",
      "label": "接口",
      "width": 150,
      "kind": "mono"
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
      "width": 80,
      "kind": "text"
    },
    {
      "key": "result",
      "label": "结果",
      "width": 70,
      "kind": "tag",
      "options": {
        "成功": "success",
        "失败": "danger"
      }
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
      "name": "接口台账",
      "columns": [
        {
          "key": "code",
          "label": "接口编号",
          "width": 150,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "接口名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "source",
          "label": "源系统",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "target",
          "label": "目标系统",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "mode",
          "label": "方式",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "sla",
          "label": "SLA",
          "width": 90,
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
            "启用": "success",
            "停用": "muted",
            "退役": "muted"
          }
        }
      ]
    },
    {
      "name": "连接器",
      "columns": [
        {
          "key": "code",
          "label": "连接器编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "连接器名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "system",
          "label": "对接系统",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "protocol",
          "label": "协议",
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
            "异常": "danger",
            "停用": "muted"
          }
        },
        {
          "key": "updated",
          "label": "更新时间",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "调用日志",
      "columns": [
        {
          "key": "code",
          "label": "调用编号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "api",
          "label": "接口",
          "width": 150,
          "kind": "mono"
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
          "width": 80,
          "kind": "text"
        },
        {
          "key": "result",
          "label": "结果",
          "width": 70,
          "kind": "tag",
          "options": {
            "成功": "success",
            "失败": "danger"
          }
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
      "label": "接口编号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "接口名称",
      "type": "input",
      "required": true
    },
    {
      "key": "source",
      "label": "源系统",
      "type": "input",
      "required": true
    },
    {
      "key": "target",
      "label": "目标系统",
      "type": "input",
      "required": false
    },
    {
      "key": "mode",
      "label": "方式",
      "type": "input",
      "required": false
    },
    {
      "key": "sla",
      "label": "SLA",
      "type": "input",
      "required": false
    },
    {
      "key": "owner",
      "label": "责任人",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "启用",
        "停用",
        "退役"
      ],
      "required": false
    },
    {
      "key": "system",
      "label": "对接系统",
      "type": "input",
      "required": false
    },
    {
      "key": "protocol",
      "label": "协议",
      "type": "input",
      "required": false
    },
    {
      "key": "updated",
      "label": "更新时间",
      "type": "input",
      "required": false
    },
    {
      "key": "api",
      "label": "接口",
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
      "key": "result",
      "label": "结果",
      "type": "select",
      "options": [
        "成功",
        "失败"
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
      "key": "create",
      "label": "登记接口",
      "perm": "admin"
    },
    {
      "key": "test",
      "label": "连通测试",
      "perm": "sre"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "log",
      "label": "调用日志"
    },
    {
      "key": "test",
      "label": "测试",
      "perm": "sre"
    },
    {
      "key": "offline",
      "label": "下线",
      "perm": "admin"
    }
  ]
} as any
