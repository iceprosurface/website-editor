import boxEditor from './box-editor.vue'

export default {
  type: 'plugin',
  install (Vue, key) {
    let BoxEditor = Vue.component(key, Vue.extend(boxEditor))
    return {
      type: this.type,
      position: 'editor-tool',
      components: [BoxEditor]
    }
  }
}
