import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const aqui = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// O app lê o dado, os recursos e os tokens de fora da pasta dele, por alias. Tudo viaja no build.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': aqui('./src'),
      '@dados': aqui('../../04-dados'),
      '@recursos': aqui('../../05-recursos'),
      '@design-system': aqui('../../03-design-system'),
      '@prototipo': aqui('..'),
    },
  },
  server: { port: 5173, strictPort: true, fs: { allow: [aqui('../..')] } },
  build: { target: 'es2022', sourcemap: false, assetsInlineLimit: 0 },
});
