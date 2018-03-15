<template>
  <div class="button-ui">
    <span class="ui-content">button</span>
    <div class="dragging-content button-dragging">
      <button>默认文字</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {},
  mounted () {
  }
}
</script>
<style lang="less" type="text/less">
  .button-ui {
    min-height: 34px;
    min-width: 120px;
    .button-dragging {
      button {
        border: 1px solid #e3e3e3;
        border-radius: 0;
        background: none;
      }
    }
  }
</style>
