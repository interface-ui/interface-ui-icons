import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ outDir: 'es' }), dts({ outDir: 'lib' })],
  build: {
    target: 'modules',
    minify: true,
    rollupOptions: {
      input: 'src/index.ts',
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: path.resolve(__dirname, 'es'),
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'cjs',
          dir: path.resolve(__dirname, 'lib'),
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          globals: {
            vue: 'Vue',
          },
        },
      ],
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'interface-ui/icons',
      formats: ['es', 'cjs'],
    },
  },
})
