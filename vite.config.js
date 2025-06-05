import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "https://CarlosRicardo06.github.io/Restaurante-Alva-rril",
  plugins: [react()],
})
