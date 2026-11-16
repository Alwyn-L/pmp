/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "cicd",
  "mod": "运维管控",
  "slug": "ops",
  "type": "list",
  "title": "CI/CD 与发布",
  "desc": "流水线、构建、制品、部署与回滚；生产变更只经 GitOps 与合并请求触发。",
  "roles": [
    "sre",
    "admin"
  ],
  "jump": [
    {
      "label": "监控与 SLO",
      "id": "observability"
    },
    {
      "label": "配置与密钥",
      "id": "config"
    },
    {
      "label": "资源与成本",
      "id": "resource"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "流水线",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "service",
      "label": "服务",
      "width": 130,
      "kind": "text"
    },
    {
      "key": "stage",
      "label": "当前阶段",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "duration",
      "label": "耗时",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "result",
      "label": "结果",
      "width": 80,
      "kind": "tag",
      "options": {
        "成功": "success",
        "失败": "danger",
        "运行中": "info"
      }
    },
    {
      "key": "trigger",
      "label": "触发人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "开始时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "env",
      "label": "环境",
      "width": 80,
      "kind": "tag",
      "options": {
        "prod": "danger",
        "staging": "warning",
        "test": "info"
      }
    },
    {
      "key": "ver",
      "label": "版本",
      "width": 90,
      "kind": "mono"
    },
    {
      "key": "strategy",
      "label": "策略",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "已发布": "success",
        "灰度中": "warning",
        "已回滚": "danger",
        "待审批": "warning"
      }
    },
    {
      "key": "name",
      "label": "环境名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "cluster",
      "label": "集群",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "namespace",
      "label": "命名空间",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "owner",
      "label": "负责人",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "流水线",
      "columns": [
        {
          "key": "code",
          "label": "流水线",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "service",
          "label": "服务",
          "width": 130,
          "kind": "text"
        },
        {
          "key": "stage",
          "label": "当前阶段",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "duration",
          "label": "耗时",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "result",
          "label": "结果",
          "width": 80,
          "kind": "tag",
          "options": {
            "成功": "success",
            "失败": "danger",
            "运行中": "info"
          }
        },
        {
          "key": "trigger",
          "label": "触发人",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "time",
          "label": "开始时间",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "发布记录",
      "columns": [
        {
          "key": "code",
          "label": "发布单号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "service",
          "label": "服务",
          "width": 130,
          "kind": "text"
        },
        {
          "key": "env",
          "label": "环境",
          "width": 80,
          "kind": "tag",
          "options": {
            "prod": "danger",
            "staging": "warning",
            "test": "info"
          }
        },
        {
          "key": "ver",
          "label": "版本",
          "width": 90,
          "kind": "mono"
        },
        {
          "key": "strategy",
          "label": "策略",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "已发布": "success",
            "灰度中": "warning",
            "已回滚": "danger",
            "待审批": "warning"
          }
        },
        {
          "key": "time",
          "label": "发布时间",
          "width": 140,
          "kind": "text"
        }
      ]
    },
    {
      "name": "环境管理",
      "columns": [
        {
          "key": "code",
          "label": "环境编码",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "环境名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "cluster",
          "label": "集群",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "namespace",
          "label": "命名空间",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "正常": "success",
            "维护中": "warning",
            "异常": "danger"
          }
        },
        {
          "key": "owner",
          "label": "负责人",
          "width": 90,
          "kind": "text"
        }
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "流水线",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "service",
      "label": "服务",
      "type": "input",
      "required": true
    },
    {
      "key": "stage",
      "label": "当前阶段",
      "type": "input",
      "required": true
    },
    {
      "key": "duration",
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
        "失败",
        "运行中"
      ],
      "required": false
    },
    {
      "key": "trigger",
      "label": "触发人",
      "type": "input",
      "required": false
    },
    {
      "key": "time",
      "label": "开始时间",
      "type": "input",
      "required": false
    },
    {
      "key": "env",
      "label": "环境",
      "type": "select",
      "options": [
        "prod",
        "staging",
        "test"
      ],
      "required": false
    },
    {
      "key": "ver",
      "label": "版本",
      "type": "input",
      "required": false
    },
    {
      "key": "strategy",
      "label": "策略",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "已发布",
        "灰度中",
        "已回滚",
        "待审批"
      ],
      "required": false
    },
    {
      "key": "name",
      "label": "环境名称",
      "type": "input",
      "required": false
    },
    {
      "key": "cluster",
      "label": "集群",
      "type": "input",
      "required": false
    },
    {
      "key": "namespace",
      "label": "命名空间",
      "type": "input",
      "required": false
    },
    {
      "key": "owner",
      "label": "负责人",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建流水线",
      "perm": "sre"
    },
    {
      "key": "release",
      "label": "发起发布",
      "perm": "sre"
    },
    {
      "key": "rollback",
      "label": "回滚",
      "perm": "sre"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "run",
      "label": "执行",
      "perm": "sre"
    },
    {
      "key": "log",
      "label": "日志"
    },
    {
      "key": "approve",
      "label": "发布审批",
      "perm": "admin"
    },
    {
      "key": "rollback",
      "label": "回滚",
      "perm": "sre"
    }
  ]
} as any
