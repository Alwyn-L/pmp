/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "equipment",
  "mod": "生产",
  "slug": "prod",
  "type": "list",
  "title": "设备管理",
  "desc": "设备台账、点检保养、故障报修与 OEE 分析；设备状态与停机实绩回传 MES，维修领用备件联动库存。",
  "roles": [
    "prod",
    "qc",
    "planner",
    "admin"
  ],
  "jump": [
    {
      "label": "安灯异常",
      "id": "andon"
    },
    {
      "label": "工单管理",
      "id": "work-order"
    },
    {
      "label": "库存管理",
      "id": "inventory"
    }
  ],
  "kpis": [
    {
      "label": "设备总数",
      "value": "186",
      "sub": "在用 168"
    },
    {
      "label": "故障中",
      "value": "4",
      "sub": "待派工 2"
    },
    {
      "label": "OEE",
      "value": "82.6%",
      "sub": "目标 ≥85%"
    },
    {
      "label": "本月停机",
      "value": "126 h",
      "sub": "较上月 -8%"
    }
  ],
  "charts": [
    {
      "type": "bar",
      "title": "设备 OEE Top5",
      "sub": "本月",
      "labels": [
        "CNC-01",
        "CNC-02",
        "装配线A",
        "注塑机B",
        "检测台C"
      ],
      "data": [
        91,
        88,
        86,
        82,
        79
      ],
      "color": "#2563eb"
    }
  ],
  "columns": [
    {
      "key": "code",
      "label": "设备编码",
      "width": 130,
      "kind": "mono"
    },
    {
      "key": "name",
      "label": "设备名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "type",
      "label": "类型",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "line",
      "label": "产线",
      "width": 100,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 90,
      "kind": "tag",
      "options": {
        "运行": "success",
        "待机": "info",
        "故障": "danger",
        "保养中": "warning",
        "停用": "muted"
      }
    },
    {
      "key": "oee",
      "label": "OEE",
      "width": 70,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "责任人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "equip",
      "label": "设备",
      "width": 120,
      "kind": "mono"
    },
    {
      "key": "plan",
      "label": "保养计划",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "cycle",
      "label": "周期",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "last",
      "label": "上次执行",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "next",
      "label": "下次到期",
      "width": 110,
      "kind": "text"
    },
    {
      "key": "fault",
      "label": "故障现象",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "level",
      "label": "等级",
      "width": 80,
      "kind": "tag",
      "options": {
        "高": "danger",
        "中": "warning",
        "低": "muted"
      }
    },
    {
      "key": "down",
      "label": "停机时长",
      "width": 90,
      "kind": "text"
    }
  ],
  "tabs": [
    {
      "name": "设备台账",
      "columns": [
        {
          "key": "code",
          "label": "设备编码",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "name",
          "label": "设备名称",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "type",
          "label": "类型",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "line",
          "label": "产线",
          "width": 100,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "运行": "success",
            "待机": "info",
            "故障": "danger",
            "保养中": "warning",
            "停用": "muted"
          }
        },
        {
          "key": "oee",
          "label": "OEE",
          "width": 70,
          "kind": "text"
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
      "name": "点检保养",
      "columns": [
        {
          "key": "code",
          "label": "点检单号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "equip",
          "label": "设备",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "plan",
          "label": "保养计划",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "cycle",
          "label": "周期",
          "width": 80,
          "kind": "text"
        },
        {
          "key": "last",
          "label": "上次执行",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "next",
          "label": "下次到期",
          "width": 110,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待执行": "warning",
            "已完成": "success",
            "已逾期": "danger"
          }
        }
      ]
    },
    {
      "name": "故障报修",
      "columns": [
        {
          "key": "code",
          "label": "报修单号",
          "width": 130,
          "kind": "mono"
        },
        {
          "key": "equip",
          "label": "设备",
          "width": 120,
          "kind": "mono"
        },
        {
          "key": "fault",
          "label": "故障现象",
          "width": 120,
          "kind": "text"
        },
        {
          "key": "level",
          "label": "等级",
          "width": 80,
          "kind": "tag",
          "options": {
            "高": "danger",
            "中": "warning",
            "低": "muted"
          }
        },
        {
          "key": "owner",
          "label": "维修人",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "down",
          "label": "停机时长",
          "width": 90,
          "kind": "text"
        },
        {
          "key": "status",
          "label": "状态",
          "width": 90,
          "kind": "tag",
          "options": {
            "待派工": "warning",
            "维修中": "info",
            "已修复": "success"
          }
        }
      ]
    }
  ],
  "filters": [
    {
      "type": "text",
      "label": "设备编码",
      "key": "code"
    },
    {
      "type": "text",
      "label": "设备名称",
      "key": "name"
    },
    {
      "type": "select",
      "label": "类型",
      "options": [
        "全部",
        "机加工",
        "装配",
        "检测",
        "公用"
      ],
      "key": "type"
    },
    {
      "type": "select",
      "label": "状态",
      "options": [
        "全部",
        "运行",
        "待机",
        "故障",
        "保养中",
        "停用"
      ],
      "key": "status"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "label": "设备编码",
      "type": "input",
      "required": false,
      "placeholder": "留空自动生成",
      "tip": "由 MES 设备主数据生成，规则 EQ-产线-3 位流水",
      "rule": "MES 唯一写入，ERP 订阅"
    },
    {
      "key": "name",
      "label": "设备名称",
      "type": "input",
      "required": true
    },
    {
      "key": "type",
      "label": "类型",
      "type": "input",
      "required": true
    },
    {
      "key": "line",
      "label": "产线",
      "type": "input",
      "required": false
    },
    {
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "运行",
        "待机",
        "故障",
        "保养中",
        "停用"
      ],
      "required": false
    },
    {
      "key": "oee",
      "label": "OEE",
      "type": "input",
      "required": false,
      "tip": "可用率 × 性能 × 良品率，T+1 计算",
      "rule": "MES 采集，指标平台统一口径"
    },
    {
      "key": "owner",
      "label": "责任人",
      "type": "input",
      "required": false
    },
    {
      "key": "equip",
      "label": "设备",
      "type": "input",
      "required": false
    },
    {
      "key": "plan",
      "label": "保养计划",
      "type": "input",
      "required": false
    },
    {
      "key": "cycle",
      "label": "周期",
      "type": "input",
      "required": false
    },
    {
      "key": "last",
      "label": "上次执行",
      "type": "input",
      "required": false
    },
    {
      "key": "next",
      "label": "下次到期",
      "type": "input",
      "required": false
    },
    {
      "key": "fault",
      "label": "故障现象",
      "type": "input",
      "required": false
    },
    {
      "key": "level",
      "label": "等级",
      "type": "select",
      "options": [
        "高",
        "中",
        "低"
      ],
      "required": false
    },
    {
      "key": "down",
      "label": "停机时长",
      "type": "input",
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新增设备",
      "perm": "prod"
    },
    {
      "key": "check",
      "label": "批量点检",
      "perm": "prod"
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
      "key": "check",
      "label": "点检",
      "perm": "prod"
    },
    {
      "key": "repair",
      "label": "报修",
      "perm": "prod"
    },
    {
      "key": "stop",
      "label": "停用",
      "perm": "admin"
    }
  ],
  "fields": [
    [
      "设备编码",
      "由 MES 设备主数据生成，规则 EQ-产线-3 位流水",
      "MES 唯一写入，ERP 订阅"
    ],
    [
      "设备状态",
      "运行/待机/故障/保养中/停用，采集优先、人工可修正",
      "设备采集 + 生产确认"
    ],
    [
      "点检周期",
      "按设备类型配置日/周/月计划，逾期自动升级待办",
      "设备管理维护"
    ],
    [
      "OEE",
      "可用率 × 性能 × 良品率，T+1 计算",
      "MES 采集，指标平台统一口径"
    ],
    [
      "维修备件",
      "报修领用备件自动扣减库存并生成领料单",
      "WMS 实绩为准"
    ]
  ]
} as any
