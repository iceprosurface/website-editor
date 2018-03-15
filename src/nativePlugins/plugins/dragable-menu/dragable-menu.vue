<template>
  <div class="dragable-menu" :class="{lock: lock}" ref="dragableMenu">
    <component :is="key + '-ui'" v-for="key in keys" :key="key"
               :data-key="key"></component>
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
    },
    lock () {
      return this.$store.state[this.__className__].lock
    }
  },
  mounted () {
    this.$store.commit(_camelCase(this.__className__) + '/registerDragMenus', this.$refs.dragableMenu)
  }
}
</script>
<style lang="less" type="text/less">
  .dragable-menu {
    .dragging-content {
      display: none;
    }
    .ui-content {
      display: block;
    }
    .sortable-ghost {
      .ui-content {
        display: block;
      }
      .dragging-content {
        display: none;
      }
    }
  }
  .sortable-drag {
    .ui-content {
      display: none;
    }
    .dragging-content {
      display: block;
    }
  }
  .viewport {
    .sortable-drag, .sortable-ghost {
      .ui-content {
        display: none;
      }
      .dragging-content {
        display: block;
      }
    }
  }
</style>
