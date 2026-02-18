import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Relative base makes `dist/` work from subfolders/static hosts.
  // Keep dev on `/` to avoid odd local paths.
  base: command === 'build' ? './' : '/',
  plugins: [react()],
  server: {
    host: true, // Expose to network
  },
  build: {
    outDir: 'dist',
  },
}))
