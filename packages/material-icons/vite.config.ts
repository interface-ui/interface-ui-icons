import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'modules',
    outDir: 'dist',
    minify: true,
    rollupOptions: {
      input: 'src/index.ts',
      external: ['vue'],
      output: {
        format: 'es',
        dir: path.resolve(__dirname, 'dist'),
        entryFileNames: '[name].js',
        exports: 'named',
        preserveModules: true,
        globals: {
          vue: 'Vue',
        },
      },
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'dist',
      formats: ['es'],
    },
  },
})
