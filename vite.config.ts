import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
    }),
  ],
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
  //   build: {
  //     rollupOptions: {
  //       output: {
  //         manualChunks: createManualChunks({
  //           react: [
  //             'react',
  //             'react-dom',
  //             'react-router',
  //             'react-router-dom',
  //             '@radix-ui',
  //             '@tanstack/react-query',
  //           ],
  //           recharts: ['recharts'],
  //           zod: ['zod'],
  //           framer: ['framer-motion'],
  //           lodash: ['lodash', 'lodash-es'],
  //         }),
  //       },
  //     },
  //   },
})

// function createManualChunks(libs: Record<string, string[]>) {
//   return function (id: string): string | undefined {
//     for (const [chunkName, keywords] of Object.entries(libs)) {
//       if (keywords.some((keyword: string) => id.includes(keyword))) {
//         return chunkName
//       }
//     }
//     if (id.includes('node_modules')) {
//       return 'vendor'
//     }
//   }
// }
