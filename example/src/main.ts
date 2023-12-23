import { createApp } from 'vue'
import './style.css'
import './styles/index.css'
import { createNotivue } from 'notivue'
import App from './App.vue'

import 'notivue/notifications.css'
import 'notivue/animations.css'

const app = createApp(App)
export const push = createNotivue(app, {
  position: 'top-right',
  limit: 3,
})
app.mount('#app')
