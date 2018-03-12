<template>
  <div class="container" :style="computedStyle">
      <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      styles: {
        display: 'flex'
      }
    }
  },
  computed: {
    computedStyle () {
      return {
        ...this.styles,
        minHeight: '100px',
        minWidth: '100px'
      }
    }
  }
}
</script>
<style lang="less" type="text/less">
  .container {
  }
</style>
