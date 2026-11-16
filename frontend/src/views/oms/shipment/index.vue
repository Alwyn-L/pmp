<template>
  <CrudPage :config="config" />
</template>

<script setup lang="ts">
import CrudPage from '@/components/crud/CrudPage.vue'
import config from './config'
</script>
