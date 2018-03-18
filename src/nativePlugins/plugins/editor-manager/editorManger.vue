<template>
  <!--阻止全局点击事件响应-->
  <div class="editor-manager" @click.stop.prevent>
    <div v-if="!currentInstance">
      <p>尚未选择组件</p>
    </div>
    <div v-else>
      <component :is="item.key" v-for="(item,index) in editorTools" :key="index"></component>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    currentInstance () {
      return this.$store.state.viewport.instances.get(this.$store.state.viewport.currentInstanceKey)
    },
    editorTools () {
      return this.$store.getters['application/getPluginsByPosition']('editorTool')
    }
  }
}
</script>
<style lang="less" type="text/less">
  .editor-manager {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
