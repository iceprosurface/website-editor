<template>
  <div class="button-instance">
    <button>button</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      instanceKey: ''
    }
  }
}
</script>
<style lang="less" type="text/less">
  .button-instance {
    display: inline-block;
    button {
      border: 1px solid #e3e3e3;
      border-radius: 0;
      background: none;
    }
  }
</style>
