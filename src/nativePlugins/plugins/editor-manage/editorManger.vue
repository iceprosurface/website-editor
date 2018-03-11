<template>
  <div class="editor-manager">
    <div v-if="editorName==='unselect'">
      <p>尚未选择组件</p>
    </div>
    <div v-else-if="editorName==='error'">
      <p>所选组件不可用</p>
    </div>
    <component :is="editorName" v-else></component>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    editorName () {
      let currentInstance = this.$store.state.viewport.instances.get(this.$store.state.viewport.currentInstanceKey)
      if (!currentInstance) {
        return 'unselect'
      }
      let className = currentInstance.__className__
      if (this.$store.state.application.pluginEditor.get(className)) {
        return `${className}-editor`
      } else {
        return 'error'
      }
    }
  }
}
</script>
<style lang="less" type="text/less">
  .editor-manager {
  }
</style>
