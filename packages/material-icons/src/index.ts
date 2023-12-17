import * as icons from './components'
import type { App } from 'vue'

export default (app: App) => {
  for (const [name, component] of Object.entries(icons)) {
    app.component(name, component)
  }
}

export * from './components'
