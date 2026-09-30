import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

/** Luna compiled spec text emit (Dashboard/Nav/Vertical): Studio Content Library Tools New Features AI Credit Usage Current */

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
