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
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Miremadi Dermatology Medical Clinic',
        short_name: 'Miremadi Medical',
        description: 'Dr. Arjang Miremadi Dermatology & Shop',
        theme_color: '#ffffff',
      }
    })
  ],
});
