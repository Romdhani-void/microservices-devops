import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
        '/api/products': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/products/, '/products')
        },
        '/api/orders': {
            target: 'http://localhost:3002',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/orders/, '/orders')
        }
    }
  }
})
