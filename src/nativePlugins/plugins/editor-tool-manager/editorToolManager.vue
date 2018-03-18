<template>
  <div class="editor-tool-manager">
    <div>toolManager</div>
    <template v-for="(editor, index) in editors" >
      <div class="cut-off" :key="index" v-if="typeof editor === 'string'">
        {{editor}}
      </div>
      <div :key="index" v-else>
        <component :instance="currentInstance" :is="editor.type" :field="editor.field" :text="editor.text"></component>
      </div>
    </template>
  </div>
</template>

<script>
import _camelCase from 'lodash/camelCase'
export default {
  data () {
    return {}
  },
  computed: {
    editorComponents () {
      return this.$store.state.viewport.getPluginsByPosition('editor-tool')
    },
    currentInstance () {
      return this.$store.getters['viewport/currentInstance']
    },
    editors () {
      if (this.currentInstance) {
        return this.$store.getters['application/getEditorsByClassName'](this.currentInstance.__className__).editors
      }
      return []
    }
  },
  method: {
    camelCase: _camelCase
  }
}
</script>
<style lang="less" type="text/less">
  .editor-tool-manager {
  }
</style>
