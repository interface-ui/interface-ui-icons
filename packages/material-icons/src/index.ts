import type { App } from 'vue'
import * as icons from './components'

export default (app: App) => {
  for (const [name, component] of Object.entries(icons))
    app.component(name, component)
}

export * from './components'
