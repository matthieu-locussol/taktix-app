import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
   plugins: [react()],
   clearScreen: false,
   server: {
      strictPort: true,
   },
   envPrefix: ['VITE_', 'TAURI_ENV_*'],
   build: {
      target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      sourcemap: !!process.env.TAURI_DEBUG,
   },
});
