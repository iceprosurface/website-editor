import containerInstance from './container-instance.vue'
import containerUi from './container-ui.vue'
import containerEditor from './container-editor.vue'
export default {
  Ui: containerUi,
  instance: containerInstance,
  editor: containerEditor,
  type: 'component'
}
