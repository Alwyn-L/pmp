<template>
  <div class="login-page">
    <div class="panel">
      <div class="intro">
        <div class="logo">P</div>
        <h1>PMP 制造协同平台</h1>
        <p>研发 · 计划 · 采购 · 生产 · 仓储 · 履约 · 物流 · 客户 · 财务 · 数据</p>
        <ul>
          <li>统一身份认证与细粒度菜单/按钮权限</li>
          <li>59 个业务页面的全链路增删改查</li>
          <li>JWT 双令牌 + 会话吊销，异地登录自动踢出</li>
        </ul>
      </div>
      <div class="form-wrap">
        <h2>账号登录</h2>
        <p class="pmp-sub">请使用管理员分配的账号登录</p>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @keyup.enter="submit">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号" size="large" clearable autocomplete="username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" show-password
                      autocomplete="current-password" />
          </el-form-item>
          <el-button type="primary" size="large" class="submit" :loading="loading" @click="submit">
            登录
          </el-button>
        </el-form>
        <el-alert class="hint" type="info" :closable="false" show-icon
                  title="演示账号：admin / Admin@123（其余角色 demo 账号密码 Demo@123）" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)
const form = reactive({ username: '', password: '' })
const rules: FormRules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

async function submit() {
  if (loading.value) return
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  try {
    await user.signIn(form.username.trim(), form.password)
    ElMessage.success('登录成功')
    const redirect = (route.query.redirect as string) || '/'
    await router.replace(redirect)
  } catch {
    // 错误提示由全局拦截器统一处理
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page { min-height: 100vh; display: grid; place-items: center; background: radial-gradient(circle at 15% 20%, #1e3a8a33, transparent 45%), radial-gradient(circle at 85% 80%, #06b6d433, transparent 40%), #0b1220; padding: 24px; }
.panel { width: min(920px, 100%); display: grid; grid-template-columns: 1.1fr .9fr; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 60px rgba(2, 6, 23, .45); }
.intro { background: linear-gradient(150deg, #0b1220, #16264a); color: #e2e8f0; padding: 40px 36px; display: flex; flex-direction: column; justify-content: center; }
.intro .logo { width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg,#2563eb,#06b6d4); display: grid; place-items: center; font-size: 22px; font-weight: 700; }
.intro h1 { font-size: 24px; margin: 18px 0 8px; }
.intro p { color: #94a3b8; font-size: 13px; line-height: 1.8; margin: 0 0 18px; }
.intro ul { padding-left: 18px; color: #cbd5e1; font-size: 13px; line-height: 2; margin: 0; }
.form-wrap { padding: 44px 40px; }
.form-wrap h2 { margin: 0 0 4px; font-size: 22px; }
.submit { width: 100%; margin-top: 6px; }
.hint { margin-top: 18px; }
@media (max-width: 760px) {
  .panel { grid-template-columns: 1fr; }
  .intro { display: none; }
}
</style>
