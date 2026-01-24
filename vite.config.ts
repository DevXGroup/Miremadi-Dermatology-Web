import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['Miremadi-logo.webp'],
      manifest: {
        name: 'Miremadi Dermatology Medical Clinic',
        short_name: 'Miremadi Medical',
        description: 'Dr. Arjang Miremadi Dermatology & Shop',
        theme_color: '#B06D7A',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'Miremadi-logo.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
});
