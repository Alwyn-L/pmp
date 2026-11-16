/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "andon",
  "mod": "生产",
  "slug": "prod",
  "type": "monitor",
  "title": "安灯异常",
  "desc": "生产现场异常呼叫、响应、升级与关闭，按类型统计停机时长与响应时效。",
  "roles": [
    "prod",
    "qc",
    "planner",
    "admin"
  ],
  "jump": [
    {
      "label": "工单管理",
      "id": "work-order"
    },
    {
      "label": "报工管理",
      "id": "report-work"
    },
    {
      "label": "监控与 SLO",
      "id": "observability"
    }
  ],
  "kpis": [
    {
      "label": "今日呼叫",
      "value": "14",
      "sub": "已关闭 11"
    },
    {
      "label": "平均响应",
      "value": "3.2 min",
      "sub": "目标 ≤5 min"
    },
    {
      "label": "未关闭",
      "value": "3",
      "sub": "超时 1 单"
    },
    {
      "label": "停机时长",
      "value": "46 min",
      "sub": "较昨日 -18%"
    }
  ],
  "charts": [
    {
      "type": "bar",
      "title": "异常类型分布",
      "sub": "近 7 天",
      "labels": [
        "设备",
        "物料",
        "质量",
        "工艺",
        "人员"
      ],
      "data": [
        18,
        12,
        9,
        5,
        3
      ],
      "color": "#ef4444"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "呼叫编号",
      "width": 140,
      "kind": "mono"
    },
    {
      "key": "line",
      "label": "产线",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 80,
      "kind": "tag",
      "options": {
        "设备": "danger",
        "物料": "warning",
        "质量": "info",
        "工艺": "primary",
        "人员": "muted"
      }
    },
    {
      "key": "desc",
      "label": "异常描述",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "caller",
      "label": "呼叫人工",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "wait",
      "label": "等待时长",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "待响应": "danger",
        "处理中": "warning",
        "已关闭": "success",
        "已升级": "danger"
      }
    },
    {
      "key": "time",
      "label": "呼叫时间",
      "width": 150,
      "kind": "text"
    }
  ],
  "tabs": [],
  "filters": [
    {
      "type": "select",
      "label": "产线",
      "options": [
        "全部",
        "总装一线",
        "总装二线",
        "机加线"
      ],
      "key": "line"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "待响应",
        "处理中",
        "已关闭",
        "已升级"
      ],
      "key": "status"
    },
    {
      "type": "select",
      "label": "类型",
      "options": [
        "全部",
        "设备",
        "物料",
        "质量",
        "工艺",
        "人员"
      ],
      "key": "type"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "呼叫编号",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成"
    },
    {
      "key": "line",
      "label": "产线",
      "type": "input",
      "required": true
    },
    {
      "key": "type",
      "label": "类型",
      "type": "select",
      "options": [
        "设备",
        "物料",
        "质量",
        "工艺",
        "人员"
      ],
      "required": true
    },
    {
      "key": "desc",
      "label": "异常描述",
      "type": "textarea",
      "required": false
    },
    {
      "key": "caller",
      "label": "呼叫人工",
      "type": "input",
      "required": false
    },
    {
      "key": "wait",
      "label": "等待时长",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "待响应",
        "处理中",
        "已关闭",
        "已升级"
      ],
      "required": false
    },
    {
      "key": "time",
      "label": "呼叫时间",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "call",
      "label": "发起呼叫",
      "perm": "prod"
    },
    {
      "key": "upgrade",
      "label": "升级",
      "perm": "prod"
    }
  ],
  "rowActions": [
    {
      "key": "respond",
      "label": "响应",
      "perm": "prod"
    },
    {
      "key": "detail",
      "label": "查看"
    },
    {
      "key": "close",
      "label": "关闭",
      "perm": "prod"
    },
    {
      "key": "escalate",
      "label": "升级",
      "perm": "prod"
    }
  ]
} as any
