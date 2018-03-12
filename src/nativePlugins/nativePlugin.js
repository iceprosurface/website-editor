import Vue from 'vue'
import { ui } from './plugin-mixins'
// 自动注入 plugins 下每一个文件夹下的index.js文件
const nativePlugins = require.context('./plugins/', true, /^\.\/[\w-]+\/index.js$/)

export default function install (state) {
  var pluginsInstance = new Map()
  var pluginsUi = new Map()
  var paths = nativePlugins.keys()
  var componentsKeys = []
  let plugins = []
  var pluginList = paths.map(k => {
    let key = k.match(/^\.\/([\w-]+)\/index.js$/)[1]
    let plugin = nativePlugins(k).default
    if (plugin.type === 'component') {
      // 混入ui的mixin， 如ui拖拽等
      plugin.Ui.mixins = [...plugin.Ui.mixins || [], ui]

      // 按照约定生成 component 实例
      let pluginInstanceTmp = Vue.component(`${key}-instance`, Vue.extend(plugin.instance))
      let pluginUiTmp = Vue.component(`${key}-ui`, Vue.extend(plugin.Ui))
      // 为每一个实例注入 __className__
      pluginInstanceTmp.prototype.__className__ = key
      pluginUiTmp.prototype.__className__ = key
      // 独立的设置set以空间换时间
      pluginsInstance.set(key, pluginInstanceTmp)
      pluginsUi.set(key, pluginUiTmp)
      // 记录所有的组件 key，组件享有特权
      componentsKeys.push(key)
      this.commit('application/setComponentProperies', plugin.properties)
    } else {
      // plugin 类， plugin 使用 install 注入Vue以及key
      // 由于plugin 是一个非常复杂的类，所以不用set逐一区别
      plugins.push({
        key,
        ...plugin.install(Vue, key)
      })
    }
    return key
  })
  state.pluginInstance = pluginsInstance
  state.pluginUi = pluginsUi
  state.pluginList = pluginList
  state.components = componentsKeys
  state.plugins = plugins
}
