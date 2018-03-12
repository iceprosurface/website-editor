import containerInstance from './container-instance.vue'
import containerUi from './container-ui.vue'
import properties from './properties.js'
export default {
  Ui: containerUi,
  instance: containerInstance,
  properties,
  type: 'component'
}
