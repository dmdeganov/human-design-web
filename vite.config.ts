import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
  resolve:{
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [react(), svgr()],
})
