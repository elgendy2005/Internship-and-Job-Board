import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The React client lives in src/client and is built into dist/ at the repo root.
// In development, Vite runs on :5173 and forwards /api calls to Express on :3000.
export default defineConfig({
  root: 'src/client',
  plugins: [react()],
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': `http://localhost:${process.env.PORT || 3000}`,
    },
  },
});
