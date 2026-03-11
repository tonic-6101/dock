import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// Try to load frappe-ui vite plugin
let frappeui: ((options?: { frappeProxy?: boolean; lucideIcons?: boolean; jinjaBootData?: boolean }) => Plugin) | undefined
try {
  const module = await import('frappe-ui/vite')
  frappeui = module.default
} catch {
  console.warn('frappe-ui vite plugin not found, continuing without it')
}

export default defineConfig({
  base: '/assets/dock/js/',

  plugins: [
    vue(),
    frappeui && frappeui({
      frappeProxy: true,
      lucideIcons: true,
      jinjaBootData: true,
    }),
  ].filter(Boolean) as Plugin[],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  build: {
    outDir: '../dock/public/js',
    emptyOutDir: true,
    target: 'es2020',
    modulePreload: false,
    rollupOptions: {
      input: {
        // Loaded into every Frappe Desk page via app_include_js
        'dock.bundle': path.resolve(__dirname, 'src/main.ts'),
        // Dynamic import target for domain apps: import('/assets/dock/js/dock-navbar.esm.js')
        'dock-navbar.esm': path.resolve(__dirname, 'src/navbar.ts'),
        // Full Vue SPA served at /dock/* via website_route_rules
        'dock-app': path.resolve(__dirname, 'src/app.ts'),
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        // No hash on CSS so www/dock.html can reference it with a stable path
        assetFileNames: 'assets/[name].[ext]',
      },
      external: [],
    },
  },

  server: {
    host: true,
    port: 5173,
    proxy: {
      '^/(api|assets|files)': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },

  optimizeDeps: {
    include: ['frappe-ui', 'vue', 'vue-router'],
  },
})
