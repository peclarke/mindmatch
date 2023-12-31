import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteWebp from 'vite-plugin-webp-generator'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    port: 9999,
    host: "0.0.0.0",
    hmr: {
      clientPort: 9999
    }
  }
})
