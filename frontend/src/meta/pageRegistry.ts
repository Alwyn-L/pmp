const views = import.meta.glob('../views/**/index.vue')

/** 菜单 component 字段 → 页面组件（按目录中的 {id}/index.vue 匹配）。 */
export function resolveView(componentId: string) {
  const suffix = `/${componentId}/index.vue`
  const key = Object.keys(views).find((k) => k.endsWith(suffix))
  return key ? views[key] : null
}
