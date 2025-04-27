/**
 * Vite Configuration
 *
 * - Proxies `/api/*` requests to your NestJS backend
 * - Disables the default HMR error overlay
 * - Registers React and TailwindCSS plugins
 * - Defines module resolution aliases (`@` → `src`, `context` → `src/context`)
 */

import { defineConfig } from 'vite'
import react         from '@vitejs/plugin-react'
import tailwindVite  from '@tailwindcss/vite'
import path           from 'path'
import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import type { WidgetManifest } from './src/types/widget-manifest'

export default defineConfig({
  // ───────────────────────────────────────────────────────────────
  // 1) Dev server + proxy settings
  // ───────────────────────────────────────────────────────────────
  server: {
    proxy: {
      // forward /api/* → Nest backend
      '/api': {
        target:      'http://localhost:3001',
        changeOrigin: true,
      },
    },
    hmr: {
      // Turn off Vite’s default full-screen overlay for build errors
      overlay: false,
    },
  },

  // ───────────────────────────────────────────────────────────────
  // 2) Plugins
  // ───────────────────────────────────────────────────────────────
  plugins: [
    react(),           // React Fast Refresh
    tailwindVite(),    // TailwindCSS via PostCSS/Vite plugin

    // ─────────────────────────────────────────────────────────────
    //  ‘generate-widget-manifest’ (dev only)
    // ─────────────────────────────────────────────────────────────
    {
      name:  'generate-widget-manifest',
      apply: 'serve',
      async buildStart() {
        const libDir   = path.join(__dirname, 'src/components/widgets/library')
        const manifests: WidgetManifest[] = []

        for (const category of readdirSync(libDir)) {
          const catDir = path.join(libDir, category)
          if (!statSync(catDir).isDirectory()) continue

          for (const widgetName of readdirSync(catDir)) {
            const widgetDir = path.join(catDir, widgetName)
            const mf        = path.join(widgetDir, 'manifest.json')
            if (statSync(widgetDir).isDirectory() && statSync(mf).isFile()) {
              manifests.push(
                JSON.parse(
                  readFileSync(mf, 'utf-8')
                ) as WidgetManifest
              )
            }
          }
        }

        writeFileSync(
          path.join(__dirname, 'public/widgets-manifest.json'),
          JSON.stringify(manifests, null, 2),
          'utf-8'
        )
        this.warn(`🛠 Generated ${manifests.length} widget manifests`)
      },
    },
  ],

  // ───────────────────────────────────────────────────────────────
  // 3) Module resolution / aliases
  // ───────────────────────────────────────────────────────────────
  resolve: {
    alias: {
      '@':       path.resolve(__dirname, './src'),
      'context': path.resolve(__dirname, './src/context'),
      // add more aliases here as needed
    },
  },
})