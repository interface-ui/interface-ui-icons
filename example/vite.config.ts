import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import Components from 'unplugin-vue-components/vite'

// const InterfaceIconResolver = () => {
//   return (name: string) => {
//     return {
//       name,
//       from: '@interface-ui/icons',
//       sideEffects: `@interface-ui/icons/es/components/${name}`,
//     }
//   }
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/interface-ui-icons/',
  // plugins: [vue(), Components({ resolvers: [InterfaceIconResolver()] })],
})
