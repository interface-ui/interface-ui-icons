import type { App, Component, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

const withInstall = <T extends Component>(comp: T, name: string) => {
  ;(comp as SFCWithInstall<T>).install = (app: App) => {
    app.component(name, comp)
  }
  return comp as SFCWithInstall<T>
}

export default withInstall
