<template>
  <div class="page-right">
    <component :is="item.key" v-for="(item, key) in tool" :key="key"></component>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    tool () {
      return this.$store.getters['application/getPluginsByPosition']('tool')
    }
  }
}
</script>

<style lang="less" type="text/less">
  .page-right {
    width: 120px;
    border-left: 1px solid #ddd;
  }
</style>
