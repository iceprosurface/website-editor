import Vue from 'vue'
import { ui } from './plugin-mixins'
const nativePlugins = require.context('./plugins/', true, /^\.\/[\w-]+\/index.js$/)
var pluginsInstance = new Map()
var pluginsEditor = new Map()
var pluginsUi = new Map()
var paths = nativePlugins.keys()
var componentsKeys = []
let plugins = []
var pluginList = paths.map(k => {
  let key = k.match(/^\.\/([\w-]+)\/index.js$/)[1]
  let plugin = nativePlugins(k).default
  if (plugin.type === 'component') {
    // 混入ui的mixin， 如ui拖拽等
    plugin.Ui.mixins = [...plugin.instance.mixins || [], ui]
    let pluginInstanceTmp = Vue.component(`${key}-instance`, Vue.extend(plugin.instance))
    let pluginEditorTmp = Vue.component(`${key}-editor`, Vue.extend(plugin.editor))
    let pluginUiTmp = Vue.component(`${key}-ui`, Vue.extend(plugin.Ui))
    pluginInstanceTmp.prototype.__className__ = key
    pluginEditorTmp.prototype.__className__ = key
    pluginUiTmp.prototype.__className__ = key
    pluginsInstance.set(key, pluginInstanceTmp)
    pluginsEditor.set(key, pluginEditorTmp)
    pluginsUi.set(key, pluginUiTmp)
    componentsKeys.push(key)
  } else {
    plugins.push({
      key,
      ...plugin.install(Vue, key)
    })
  }
  return key
})

export default {
  instances: pluginsInstance,
  editors: pluginsEditor,
  Uis: pluginsUi,
  pluginList,
  componentsKeys,
  plugins
}
