import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      // dev specific config
      plugins: [react(), basicSsl()],
      https: true,
      port: 3000,
    };
  } else {
    return {
      // build specific config
      plugins: [react()],
    };
  }
});
