<template>
  <div class="guildline-container" :style="dymStyle" v-show="isShow && guildLineShow"></div>
</template>

<script>
export default {
  data () {
    return {
      dymStyle: {},
      isShow: false
    }
  },
  computed: {
    guildLineShow () {
      return !this.$store.state.viewport.dragInfo
    }
  },
  methods: {
    calc () {
      if (this.$store.state.viewport.currentHoverInstanceKey === null) {
        this.isShow = false
        return
      }
      // 设置  style
      let key = this.$store.state.viewport.currentHoverInstanceKey
      const instanceDom = this.$store.state.viewport.instances.get(key).vm
      const targetBoundingClientRect = instanceDom.$el.getBoundingClientRect()
      const viewportBoundingClientRect = this.$store.state.viewport.viewportDom.getBoundingClientRect()
      this.dymStyle = {
        width: `${targetBoundingClientRect.width - 1}px`,
        height: `${targetBoundingClientRect.height - 1}px`,
        top: `${targetBoundingClientRect.top - viewportBoundingClientRect.top}px`,
        left: `${targetBoundingClientRect.left - viewportBoundingClientRect.left}px`
      }
      this.isShow = true
    },
    setShowOff () {
      this.isShow = false
    }
  },
  destroyed () {
    this.websiteEditEventBus.$off('dom-mouse-hover', this.calc)
    this.websiteEditEventBus.$off('viewport-mouseout', this.setShowOff)
  },
  mounted () {
    this.websiteEditEventBus.$on('dom-mouse-hover', this.calc)
    this.websiteEditEventBus.$on('viewport-mouseout', this.setShowOff)
  }
}
</script>
<style lang="less" type="text/less" scoped>
  .guildline-container {
    position: absolute;
    border: 1px solid #3F51B5;
    pointer-events: none;
    transition: all .1s ease;
  }
</style>
