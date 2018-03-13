/**
 * Created by icepro on 2018/3/13.
 */
import dragableMenu from './dragable-menu.vue'
import store from './store'
export default {
  type: 'plugin',
  install (Vue, key) {
    let DragableMenu = Vue.component(key, Vue.extend(dragableMenu))
    DragableMenu.prototype.__className__ = key
    store.state.__className__ = key
    return {
      type: this.type,
      position: 'left-container',
      components: [DragableMenu],
      store
    }
  }
}
