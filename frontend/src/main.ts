import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './styles/tokens.css'
import App from './App.vue'
import router from './router'
import perm from './directives/perm'

const app = createApp(App)
Object.entries(Icons).forEach(([name, component]) => {
  app.component(name, component as any)
})
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.directive('perm', perm)
app.mount('#app')
