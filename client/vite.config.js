import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // Import PWA plugin

export default defineConfig({
  plugins: [
    react(),
    VitePWA(
      {
      registerType: 'autoUpdate', // Auto-update service worker
      manifest: {
        name: 'Your App Name',
        short_name: 'App',
        description: 'Your app description',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // Fullscreen PWA
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    {
      strategies: 'injectManifest', // Use custom SW
      srcDir: 'src',
      filename: 'sw.js',
      // ... rest of config
    }
  ],
  server: {
    host: true,
  },
});