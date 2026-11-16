<template>
  <el-result icon="warning" title="403" sub-title="当前账号无权访问该页面，请联系管理员分配权限">
    <template #extra>
      <el-button type="primary" @click="$router.replace('/')">返回首页</el-button>
    </template>
  </el-result>
</template>
