/**
 * Created by icepro on 2018/3/12.
 */
import editorToolManager from './editorToolManager.vue'

export default {
  type: 'plugin',
  install (Vue, key) {
    let EditorToolManager = Vue.component(key, Vue.extend(editorToolManager))
    return {
      type: this.type,
      position: 'editorTool',
      components: [EditorToolManager]
    }
  }
}
