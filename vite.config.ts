import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    host: true,
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/app/styles/helpers" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
