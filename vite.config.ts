import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import cvPdf from './vite-plugins/cv-pdf.ts'

// Dev runs on :5176 under pm2 (`cebrian-dev`). `base: './'` keeps the build
// portable: it works at a domain root or under a sub-path, whatever host we pick.
export default defineConfig({
  plugins: [react(), tailwindcss(), cvPdf()],
  base: './',
  server: { host: true, port: 5176, strictPort: true },
  preview: { host: true, port: 5176, strictPort: true },
})
