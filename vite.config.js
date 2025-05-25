import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true // This line makes Vite accessible on your local network
    // Alternatively, you could use: host: '0.0.0.0'
  }
})