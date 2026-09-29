import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Dev runs on :5176 under pm2 (`cebrian-dev`). `base: './'` keeps the build
// portable: it works at a domain root or under a sub-path, whatever host we pick.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  server: { host: true, port: 5176, strictPort: true },
  preview: { host: true, port: 5176, strictPort: true },
  // The only chunk over the default 500 kB is react-pdf (~1.2 MB), which is
  // lazy-loaded when a visitor downloads the CV; the main bundle stays small.
  build: { chunkSizeWarningLimit: 1300 },
})
