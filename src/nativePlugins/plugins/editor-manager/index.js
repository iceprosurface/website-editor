import editorManager from './editorManger.vue'

export default {
  type: 'plugin',
  install (Vue, key) {
    let GuildLine = Vue.component(key, Vue.extend(editorManager))
    return {
      type: this.type,
      position: 'tool',
      components: [GuildLine]
    }
  }
}
