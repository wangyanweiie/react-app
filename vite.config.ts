import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },
    plugins: [react()],
});
