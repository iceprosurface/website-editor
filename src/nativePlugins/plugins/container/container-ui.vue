<template>
  <div class="container">
    <span class="ui-content">contaner</span>
    <div class="dragging-content container-dragging">
      默认容器
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="less" type="text/less">
  .container {
    .dragging-content {
      box-shadow:2px 2px 3px #aaaaaa;
      border: 1px solid #939393;
      min-height: 100px;
      min-width: 100px;
    }
  }
</style>
