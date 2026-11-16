/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "bpm",
  "mod": "公共能力",
  "slug": "platform",
  "type": "list",
  "title": "流程中心",
  "desc": "BPMN 流程定义、版本发布、流程实例与我的审批；业务系统统一接入，不再各自实现审批。",
  "roles": [
    ""
  ],
  "jump": [
    {
      "label": "待办中心",
      "id": "todo"
    },
    {
      "label": "身份与权限",
      "id": "iam"
    },
    {
      "label": "规则引擎",
      "id": "rule"
    }
  ],
  "flow": {
    "steps": [
      "流程设计",
      "测试验证",
      "发布生效",
      "运行监控",
      "版本下线"
    ],
    "current": 2
  },
  "columns": [
    {
      "key": "code",
      "label": "流程编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "流程名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "biz",
      "label": "业务域",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "ver",
      "label": "版本",
      "width": 70,
      "kind": "mono"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "草稿": "muted",
        "已发布": "success",
        "已下线": "muted"
      }
    },
    {
      "key": "owner",
      "label": "负责人",
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
      "key": "def",
      "label": "流程名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "starter",
      "label": "发起人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "node",
      "label": "当前节点",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "time",
      "label": "开始时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "title",
      "label": "标题",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "arrive",
      "label": "到达时间",
      "width": 140,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "流程定义",
      "columns": [
        {
          "key": "code",
          "label": "流程编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "流程名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "biz",
          "label": "业务域",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "ver",
          "label": "版本",
          "width": 70,
          "kind": "mono"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 80,
          "kind": "tag",
          "options": {
            "草稿": "muted",
            "已发布": "success",
            "已下线": "muted"
          }
        },
        {
          "key": "owner",
          "label": "负责人",
          "width": 90,
          "kind": "text"
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
      "name": "流程实例",
      "columns": [
        {
          "key": "code",
          "label": "实例编号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "def",
          "label": "流程名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "starter",
          "label": "发起人",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "node",
          "label": "当前节点",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "运行中": "info",
            "已完成": "success",
            "已终止": "danger",
            "挂起": "warning"
          }
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
      "name": "我的审批",
      "columns": [
        {
          "key": "code",
          "label": "实例编号",
          "width": 140,
          "kind": "mono"
        },
        {
          "key": "def",
          "label": "流程名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "title",
          "label": "标题",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "starter",
          "label": "发起人",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "arrive",
          "label": "到达时间",
          "width": 140,
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
      ]
    }
  ],
  "filters": [],
  "formFields": [
    {
      "key": "code",
      "label": "流程编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "name",
      "label": "流程名称",
      "type": "input",
      "required": true
    },
    {
      "key": "biz",
      "label": "业务域",
      "type": "input",
      "required": true
    },
    {
      "key": "ver",
      "label": "版本",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "草稿",
        "已发布",
        "已下线"
      ],
      "required": false
    },
    {
      "key": "owner",
      "label": "负责人",
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
      "key": "def",
      "label": "流程名称",
      "type": "input",
      "required": false
    },
    {
      "key": "starter",
      "label": "发起人",
      "type": "input",
      "required": false
    },
    {
      "key": "node",
      "label": "当前节点",
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
      "key": "title",
      "label": "标题",
      "type": "input",
      "required": false
    },
    {
      "key": "arrive",
      "label": "到达时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "design",
      "label": "新建流程",
      "perm": "admin"
    },
    {
      "key": "deploy",
      "label": "发布",
      "perm": "admin"
    }
  ],
  "rowActions": [
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "model",
      "label": "流程设计",
      "perm": "admin"
    },
    {
      "key": "approve",
      "label": "审批"
    },
    {
      "key": "terminate",
      "label": "终止",
      "perm": "admin"
    }
  ]
} as any
