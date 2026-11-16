/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "workbench",
  "mod": "工作台",
  "slug": "workbench",
  "type": "workbench",
  "title": "我的工作台",
  "desc": "按角色聚合待办、审批、预警与快捷入口，是全部系统的统一入口。",
  "roles": [
    ""
  ],
  "jump": [
    {
      "label": "待办中心",
      "id": "todo"
    },
    {
      "label": "经营驾驶舱",
      "id": "dashboard"
    },
    {
      "label": "消息中心",
      "id": "message"
    }
  ],
  "kpis": [
    {
      "label": "今日待办",
      "value": "12",
      "sub": "待审批 5 · 待处理 7",
      "tone": "warning"
    },
    {
      "label": "我发起的",
      "value": "6",
      "sub": "进行中 4 · 已完成 2",
      "tone": "info"
    },
    {
      "label": "未读消息",
      "value": "8",
      "sub": "告警 3 · 业务 5",
      "tone": "danger"
    },
    {
      "label": "本周完成",
      "value": "23",
      "sub": "较上周 +12%",
      "tone": "success"
    }
  ],
  "todos": [
    [
      "采购订单 PO-2026-0412 待审批",
      "采购",
      "10:30",
      "warning"
    ],
    [
      "ECN-2026-0087 变更待审核",
      "研发",
      "09:45",
      "warning"
    ],
    [
      "库存差异工单 DIF-0312 待处理",
      "仓储",
      "昨天",
      "danger"
    ],
    [
      "RMA-2026-0156 退货待质检",
      "售后",
      "昨天",
      "info"
    ],
    [
      "S&OP 11 月会议材料待确认",
      "计划",
      "11-09",
      "info"
    ]
  ],
  "notices": [
    [
      "系统维护通知：11 月 16 日 22:00-24:00 网关升级",
      "2026-11-10"
    ],
    [
      "主数据治理月报（10 月）已发布",
      "2026-11-08"
    ],
    [
      "关于规范接口台账登记的通知",
      "2026-11-05"
    ],
    [
      "数据口径变更：库存准确率计算方式更新",
      "2026-11-02"
    ]
  ],
  "quicks": [
    [
      "新建采购申请",
      "purchase-req",
      "＋"
    ],
    [
      "订单审核",
      "order-review",
      "✓"
    ],
    [
      "库存查询",
      "inventory",
      "▤"
    ],
    [
      "主数据查询",
      "mdm",
      "⬡"
    ],
    [
      "发布记录",
      "cicd",
      "⌘"
    ],
    [
      "异常处理",
      "andon",
      "!"
    ]
  ]
} as any
