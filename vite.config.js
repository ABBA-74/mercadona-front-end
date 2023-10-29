import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      // dev specific config
      plugins: [react(), basicSsl()],
    };
  } else {
    // command === 'build'
    return {
      // build specific config
      plugins: [react()],
    };
  }
});
