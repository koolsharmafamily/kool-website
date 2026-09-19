import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from the domain root on Vercel — do not set a subpath `base` here,
// or every asset URL 404s in production.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
  },
})
