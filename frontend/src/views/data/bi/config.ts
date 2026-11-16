/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "bi",
  "mod": "数据",
  "slug": "data",
  "type": "dashboard",
  "title": "自助报表",
  "desc": "拖拽式报表与看板搭建，支持维度、指标、筛选与订阅推送，口径统一取自指标平台。",
  "roles": [
    "data",
    "exec",
    "planner",
    "fin",
    "sales",
    "admin"
  ],
  "jump": [
    {
      "label": "指标平台",
      "id": "indicator"
    },
    {
      "label": "经营驾驶舱",
      "id": "dashboard"
    },
    {
      "label": "数据质量与血缘",
      "id": "data-quality"
    }
  ],
  "kpis": [
    {
      "label": "我的报表",
      "value": "18",
      "sub": "共享 6"
    },
    {
      "label": "今日访问",
      "value": "246",
      "sub": "活跃用户 38"
    },
    {
      "label": "订阅任务",
      "value": "12",
      "sub": "全部成功"
    },
    {
      "label": "平均加载",
      "value": "1.2s",
      "sub": "P95 2.4s"
    }
  ],
  "charts": [
    {
      "type": "bar",
      "title": "各工厂产值（万元）",
      "sub": "2026 年 10 月",
      "labels": [
        "上海",
        "苏州",
        "杭州",
        "宁波",
        "合肥"
      ],
      "data": [
        8600,
        6200,
        5400,
        4800,
        3600
      ],
      "color": "#2563eb"
    },
    {
      "type": "line",
      "title": "订单履约率趋势",
      "sub": "近 8 周",
      "labels": [
        "W1",
        "W2",
        "W3",
        "W4",
        "W5",
        "W6",
        "W7",
        "W8"
      ],
      "series": [
        [
          "履约率",
          [
            94.2,
            94.8,
            95.1,
            95.6,
            96,
            96.2,
            96.5,
            96.8
          ],
          "#06b6d4"
        ]
      ]
    }
  ],
  "columns": [
    {
      "key": "name",
      "label": "报表名称",
      "width": 120,
      "kind": "text"
    },
    {
      "key": "domain",
      "label": "数据域",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "owner",
      "label": "创建人",
      "width": 90,
      "kind": "text"
    },
    {
      "key": "views",
      "label": "访问量",
      "width": 80,
      "kind": "text"
    },
    {
      "key": "updated",
      "label": "更新时间",
      "width": 140,
      "kind": "text"
    },
    {
      "key": "status",
      "label": "状态",
      "width": 80,
      "kind": "tag",
      "options": {
        "已发布": "success",
        "草稿": "muted",
        "已下线": "muted"
      }
    }
  ],
  "tabs": [],
  "filters": [],
  "formFields": [
    {
      "key": "name",
      "label": "报表名称",
      "type": "input",
      "required": true
    },
    {
      "key": "domain",
      "label": "数据域",
      "type": "input",
      "required": true
    },
    {
      "key": "owner",
      "label": "创建人",
      "type": "input",
      "required": true
    },
    {
      "key": "views",
      "label": "访问量",
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
      "key": "status",
      "label": "状态",
      "type": "select",
      "options": [
        "已发布",
        "草稿",
        "已下线"
      ],
      "required": false
    }
  ],
  "actions": [
    {
      "key": "create",
      "label": "新建报表",
      "perm": "data"
    },
    {
      "key": "subscribe",
      "label": "订阅推送",
      "perm": "data"
    }
  ]
} as any
