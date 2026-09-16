import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const validationEmail =
    process.env.LUNA_VALIDATION_EMAIL ||
    process.env.VITE_LUNA_VALIDATION_EMAIL ||
    env.LUNA_VALIDATION_EMAIL ||
    env.VITE_LUNA_VALIDATION_EMAIL ||
    ''
  const validationPassword =
    process.env.LUNA_VALIDATION_PASSWORD ||
    process.env.VITE_LUNA_VALIDATION_PASSWORD ||
    env.LUNA_VALIDATION_PASSWORD ||
    env.VITE_LUNA_VALIDATION_PASSWORD ||
    ''

  return {
    define: {
      __LUNA_VALIDATION_EMAIL__: JSON.stringify(validationEmail),
      __LUNA_VALIDATION_PASSWORD__: JSON.stringify(validationPassword),
    },
    server: {
      proxy: {
        '/api': {
          target:
            process.env.LUNA_VALIDATION_API_PROXY_TARGET ||
            'http://174.138.72.184:8989',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
