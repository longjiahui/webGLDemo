import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import tailwindcssPlugin from 'tailwindcss'

import AutoImport from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            // dirs: ['src/autoImports'],
            imports: ['vue', 'vue-router'],
            dts: 'src/auto-imports.d.ts',
        }),
        AutoImportComponents({
            dirs: ['src/components'],
            extensions: ['vue'],
            deep: true,
            dts: 'src/components.d.ts',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve('./src'),
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcssPlugin()],
        },
    },
})
