import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['corgi.png', 'corgi-notes.png', 'favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Online Notepad',
        short_name: 'VitePWA',
        description: 'VitePWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'corgi-notes.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'corgi-notes.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/online-notepad/' // Required for GitHub Pages
})
