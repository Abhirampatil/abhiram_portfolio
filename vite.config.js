import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' keeps asset paths working on Vercel AND GitHub Pages (any repo name)
export default defineConfig({ plugins: [react()], base: './' })
