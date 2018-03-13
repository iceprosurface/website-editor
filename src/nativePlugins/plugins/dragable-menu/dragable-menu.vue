<template>
  <div class="dragable-menu" ref="dragableMenu">
    <component :is="key + '-ui'" v-for="key in keys" :key="key"></component>
  </div>
</template>

<script>
import _camelCase from 'lodash/camelCase'
export default {
  data () {
    return {}
  },
  computed: {
    keys () {
      return this.$store.state.application.components
    }
  },
  mounted () {
    this.$store.commit(_camelCase(this.__className__) + '/registerDragMenus', this.$refs.dragableMenu)
  }
}
</script>
<style lang="less" type="text/less">
  .dragable-menu {
  }
</style>
