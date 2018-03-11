<template>
  <div class="page-left">
    <component :is="key + '-ui'" v-for="key in keys" :key="key"></component>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keys: []
    }
  },
  components: {},
  created () {
    this.keys = this.$store.state.application.components
  }
}
</script>
<style lang="less" type="text/less">
  .page-left {
    width: 140px;
    border: 1px solid #333;
  }
</style>
