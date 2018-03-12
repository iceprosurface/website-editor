/**
 * Created by icepro on 2018/3/10.
 */
import install from './../nativePlugins/nativePlugin'
const app = {
  namespaced: true,
  state: {
    pluginList: null,
    components: null,
    plugins: null,
    pluginUi: null,
    pluginInstance: null,
    componentSettings: new Map()
  },
  mutations: {
    init (state) {
      install.call(this, state)
    },
    setComponentProperies (state, {className, properies}) {
      state.componentSettings.set(className, properies)
    }
  },
  getters: {
    getPluginsByPosition: (state) => (position) => {
      return state.plugins.filter(plugin => plugin.type !== 'component' && position === plugin.position)
    }
  }
}
export default app
