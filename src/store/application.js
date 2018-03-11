/**
 * Created by icepro on 2018/3/10.
 */
import nativePlugin from './../nativePlugins/nativePlugin'
export default {
  namespaced: true,
  state: {
    pluginList: nativePlugin.pluginList,
    components: nativePlugin.componentsKeys,
    plugins: nativePlugin.plugins,
    pluginUi: nativePlugin.Uis,
    pluginInstance: nativePlugin.instances,
    pluginEditor: nativePlugin.editors
  },
  getters: {
    getPluginByPosition: (state) => (position) => {
      return state.plugins.filter(plugin => plugin.type !== 'component' && position === plugin.position)
    }
  }
}
