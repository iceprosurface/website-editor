<template>
  <div class="container-ui">
    <span class="ui-content">contaner</span>
    <div class="dragging-content container-dragging">
      <div class="display-name">默认容器</div>
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
  @enhance-color: #7d7d7d;
  .container-ui {
    .container-dragging {
      box-shadow:2px 2px 3px #aaaaaa;
      border: 1px solid @enhance-color;
      min-height: 100px;
      min-width: 100px;
      position: relative;
      .display-name {
        top: 0;
        right: 0;
        color: @enhance-color;
        font-size: 12px;
        padding: 4px;
        position: absolute;
        border-left: 1px solid @enhance-color;
        border-bottom: 1px solid @enhance-color;
      }
    }
  }
</style>
