import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import md from 'vite-plugin-markdown';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),md],  
  assetsInclude: ['**/*.md']
})
