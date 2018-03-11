/**
 * Created by icepro on 2018/3/11.
 */
import component from './index.vue'
import application from './store/application'
import viewport from './store/viewport'
let WebEditor = {
  install (Vue, options) {
    let store = options.store
    if (!store) {
      console.error('web editor 需要 vuex')
      return
    }
    // 注册store 模块
    if (!store.state.application) {
      store.registerModule('application', application)
    }
    if (!store.state.viewport) {
      store.registerModule('viewport', viewport)
    }
    // 注册组件
    Vue.component('web-editor', component)
  }
}
export default WebEditor
