import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Required for Electron to load assets correctly
  server: {
    port: 5173,
    strictPort: true, // 포트가 사용중이면 에러 발생 (자동으로 다른 포트 사용 안함)
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'game-modules': [
            './src/modules/training/TrainingModule',
            './src/modules/system/SystemModule'
          ]
        }
      }
    }
  }
})
