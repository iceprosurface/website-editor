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
    componentSettings: new Map(),
    pluginSetting: new Map()
  },
  mutations: {
    init (state, store) {
      install.call(this, state, store)
    },
    setComponentProperies (state, {className, properies}) {
      state.componentSettings.set(className, properies)
    }
  },
  getters: {
    getPluginsByPosition: (state) => (position) => {
      return state.plugins.filter(plugin => plugin.type !== 'component' && position === plugin.position)
    },
    getEditorsByClassName: (state) => (className) => {
      return state.pluginSetting.get(className).properties
    }
  }
}
export default app
