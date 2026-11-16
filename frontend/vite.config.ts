import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

/** 构建时输出 version.json，供部署校验脚本确认前端产物版本与构建时间。 */
function versionFile(): Plugin {
  return {
    name: 'pmp-version-file',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify(
          {
            service: 'pmp-frontend',
            version: process.env.APP_VERSION || '1.0.0',
            buildTime: new Date().toISOString()
          },
          null,
          2
        )
      })
    }
  }
}

export default defineConfig({
  plugins: [vue(), versionFile()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  server: {
    port: 5173,
    proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } }
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          element: ['element-plus', '@element-plus/icons-vue'],
          chart: ['echarts']
        }
      }
    }
  }
})
