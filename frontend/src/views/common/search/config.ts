/* 由 scripts/gen-pages.mjs 生成，请勿手工修改 */
export default {
  "id": "search",
  "mod": "帮助与异常",
  "slug": "common",
  "type": "search",
  "title": "全局搜索",
  "desc": "跨页面、单据与主数据的统一搜索入口，按域分组展示，支持快捷键 Ctrl+K。",
  "roles": [
    ""
  ],
  "jump": [
    {
      "label": "采购订单",
      "id": "purchase-order"
    },
    {
      "label": "库存管理",
      "id": "inventory"
    },
    {
      "label": "BOM 管理",
      "id": "bom"
    }
  ],
  "kpis": [
    {
      "label": "可搜索对象",
      "value": "12 类",
      "sub": "单据/主数据/页面"
    },
    {
      "label": "索引延迟",
      "value": "< 5s",
      "sub": "实时同步"
    },
    {
      "label": "今日搜索",
      "value": "1,286",
      "sub": "次"
    }
  ]
} as any
