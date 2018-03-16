<template>
  <div class="page-middle viewport" @mouseleave="mouseleave">
    <component :is="item.key" v-for="(item, key) in viewport" :key="key"></component>
    <div class="page-root" ref="viewport"></div>
  </div>
</template>

<script>
import eventBus from './../service/eventBus'
export default {
  data () {
    return {
    }
  },
  computed: {
    viewportStore () {
      return this.$store.state.viewport
    },
    applicationStore () {
      return this.$store.state.application
    },
    viewport () {
      return this.$store.getters['application/getPluginsByPosition']('viewport')
    }
  },
  methods: {
    mouseleave () {
      eventBus.viewportMouseout()
    }
  },
  mounted () {
    this.$store.commit('viewport/initViewport', {
      viewportDom: this.$refs.viewport,
      store: this.$store
    })
  }
}
</script>

<style lang="less" type="text/less">
  .page-middle {
    flex: 1;
    .page-root {
      width: 100%;
      height: 100%;
    }
  }
</style>
