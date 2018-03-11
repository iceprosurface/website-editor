<template>
  <div class="page" @click="globalClick">
    <page-left class="page-item"></page-left>
    <page-middle class="page-item"></page-middle>
    <page-right class="page-item"></page-right>
  </div>
</template>

<script>
import pageLeft from './pageLeft.vue'
import pageMiddle from './pageMiddle.vue'
import pageRight from './pageRight.vue'
import eventBus from './../service/eventBus'
export default {
  data () {
    return {}
  },
  components: {
    pageLeft,
    pageRight,
    pageMiddle
  },
  methods: {
    globalClick () {
      eventBus.GlobalClick()
    }
  }
}
</script>

<style lang="less" type="text/less" scoped>
  .page {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    .page-item {
      height: 100%;
    }
  }
</style>
