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

// ── Shared Vue runtime ──────────────────────────────────────────────
// Dock ships Vue's ESM browser build at /assets/dock/js/vendor/vue.esm.js.
// Both Dock and domain apps (Orga, etc.) externalize `vue` and import from
// this URL, guaranteeing a single Vue runtime across all bundles.
// Without this, each app bundles its own Vue and cross-bundle components crash.
const SHARED_VUE_URL = '/assets/dock/js/vendor/vue.esm.js'

// Plugin: intercept `import ... from 'vue'` and make it external, pointing
// to the shared URL. Must run before @vitejs/plugin-vue's resolveId.
function vueSharedPlugin(): Plugin {
  return {
    name: 'vue-shared',
    enforce: 'pre',
    resolveId(id) {
      if (id === 'vue' || id === '@vue/runtime-dom' || id === '@vue/runtime-core' || id === '@vue/reactivity') {
        return { id: SHARED_VUE_URL, external: true }
      }
    },
  }
}

// Plugin: copy Vue's runtime ESM browser build to the output directory
// so it's served at /assets/dock/js/vendor/vue.esm.js by Frappe.
function copyVueRuntime(): Plugin {
  return {
    name: 'copy-vue-runtime',
    writeBundle() {
      const src = path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm-browser.prod.js')
      const dest = path.resolve(__dirname, '../dock/public/js/vendor/vue.esm.js')
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.copyFileSync(src, dest)
    },
  }
}

// Plugin: generate dock.bundle.js as an IIFE loader.
// Frappe's app_include_js loads scripts via <script type="text/javascript">,
// which does NOT support static `import` (ES modules). Dynamic import() IS
// supported in regular scripts, so this tiny IIFE bootstraps the real ESM entry.
function deskBundleLoader(): Plugin {
  return {
    name: 'desk-bundle-loader',
    writeBundle() {
      const loader = `// Auto-generated IIFE loader — do not edit. See vite.config.ts deskBundleLoader().
// Frappe loads this via <script type="text/javascript"> (not module), so we
// use dynamic import() to bootstrap the real ESM entry point.
;(function() {
  function mount() {
    var boot = window.frappe && window.frappe.boot && window.frappe.boot.dock;
    if (!boot || !boot.installed) return;
    import('/assets/dock/js/dock-desk.js').catch(function(err) {
      console.error('[Dock] Failed to load navbar module:', err);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
`
      const dest = path.resolve(__dirname, '../dock/public/js/dock.bundle.js')
      fs.writeFileSync(dest, loader)
    },
  }
}

// Plugin: inject CSS into async JS chunks so they're self-contained.
// Vite extracts scoped CSS into separate .css files, but with modulePreload:false
// the async chunks never load them. This plugin inlines each chunk's CSS
// as a <style> injection at the top of the JS, guaranteeing styles load
// in any context (ESM imports from domain apps, SPA, Desk).
function cssInjectedByJs(): Plugin {
  return {
    name: 'css-injected-by-js',
    enforce: 'post',
    generateBundle(_, bundle) {
      // Collect CSS assets keyed by base name (e.g. "DockTimerPanel" → css source)
      const cssByName = new Map<string, string>()
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (asset.type === 'asset' && fileName.endsWith('.css')) {
          // assets/DockTimerPanel.css → DockTimerPanel
          const base = fileName.replace(/^assets\//, '').replace(/\.css$/, '')
          cssByName.set(base, asset.source as string)
        }
      }

      // For each async chunk, find matching CSS and inject it
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk' || chunk.isEntry) continue
        const css = cssByName.get(chunk.name)
        if (!css) continue
        const escaped = JSON.stringify(css)
        const injection = `;(function(){try{var d=document,s=d.createElement("style");s.dataset.viteChunk=${JSON.stringify(chunk.name)};s.textContent=${escaped};d.head.appendChild(s)}catch(e){}})();\n`
        chunk.code = injection + chunk.code
      }
    },
  }
}

// Plugin: copy tokens.css as a standalone file to dock/public/css/dock-tokens.css.
// Domain apps load this via <link> tag — single source of truth for --dock-* properties.
function copyTokensCss(): Plugin {
  return {
    name: 'copy-tokens-css',
    writeBundle() {
      const src = path.resolve(__dirname, 'src/styles/tokens.css')
      const dest = path.resolve(__dirname, '../dock/public/css/dock-tokens.css')
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.copyFileSync(src, dest)
      console.log('Copied dock-tokens.css to dock/public/css/')
    },
  }
}

// Plugin: build dock-navbar.css — pre-built Tailwind utilities for all exported
// Dock components. Domain apps load this via <link> tag instead of scanning
// Dock source in their own Tailwind content config.
function buildNavbarCss(): Plugin {
  return {
    name: 'build-navbar-css',
    async closeBundle() {
      const { build } = await import('vite')
      const tailwindcss = (await import('tailwindcss')).default
      const autoprefixer = (await import('autoprefixer')).default

      await build({
        configFile: false,
        plugins: [vue()],
        css: {
          postcss: {
            plugins: [
              tailwindcss({ config: path.resolve(__dirname, 'tailwind.navbar.config.js') }),
              autoprefixer(),
            ],
          },
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, 'src'),
          },
        },
        build: {
          outDir: path.resolve(__dirname, '../dock/public/css'),
          emptyOutDir: false,
          write: true,
          lib: {
            entry: path.resolve(__dirname, 'src/navbar-styles.ts'),
            formats: ['es'],
            fileName: () => '_navbar-css-stub.js',
          },
          rollupOptions: {
            output: {
              assetFileNames: 'dock-navbar.[ext]',
            },
          },
        },
        logLevel: 'warn',
      })

      // Clean up the JS stub (we only want the CSS)
      const stubPath = path.resolve(__dirname, '../dock/public/css/_navbar-css-stub.js')
      if (fs.existsSync(stubPath)) fs.unlinkSync(stubPath)

      console.log('Built dock-navbar.css in dock/public/css/')
    },
  }
}

export default defineConfig({
  base: '/assets/dock/js/',

  plugins: [
    vueSharedPlugin(),
    vue(),
    frappeui && frappeui({
      frappeProxy: true,
      lucideIcons: true,
      jinjaBootData: true,
    }),
    copyVueRuntime(),
    cssInjectedByJs(),
    copyTokensCss(),
    deskBundleLoader(),
    buildNavbarCss(),
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
        // ESM entry — loaded by the IIFE loader (dock.bundle.js) via dynamic import()
        'dock-desk': path.resolve(__dirname, 'src/main.ts'),
        // Dynamic import target for domain apps: import('/assets/dock/js/dock-navbar.esm.js')
        'dock-navbar.esm': path.resolve(__dirname, 'src/navbar.ts'),
        // Full Vue SPA served at /dock/* via website_route_rules
        'dock-app': path.resolve(__dirname, 'src/app.ts'),
        // Collaboration components ESM — domain apps import from /assets/dock/js/dock-collab.esm.js
        'dock-collab.esm': path.resolve(__dirname, 'src/collab.ts'),
      },
      // Preserve named exports on entry points — domain apps do:
      //   import { DockLayout } from '/assets/dock/js/dock-navbar.esm.js'
      preserveEntrySignatures: 'exports-only',
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        // No hash on CSS so www/dock.html can reference it with a stable path
        assetFileNames: 'assets/[name].[ext]',
      },
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
