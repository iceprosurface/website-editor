import guildLine from './guildLine.vue'

export default {
  type: 'plugin',
  install (Vue, key) {
    let GuildLine = Vue.component(key, Vue.extend(guildLine))
    return {
      type: this.type,
      position: 'viewport',
      components: [GuildLine]
    }
  }
}
