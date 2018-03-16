<template>
  <div class="page-left">
    <component :is="item.key" v-for="(item, key) in leftContainers" :key="key"></component>
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
  computed: {
    leftContainers () {
      return this.$store.getters['application/getPluginsByPosition']('left-container')
    }
  },
  created () {
  }
}
</script>
<style lang="less" type="text/less">
  .page-left {
    width: 300px;
    border-right: 1px solid #ddd;
  }
</style>
