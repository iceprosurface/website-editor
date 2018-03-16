<template>
  <div class="container" :style="computedStyle"  data-slot-name='default'>
      <div class="instance-name">{{this.instanceKey}}</div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      styles: {
        display: 'flex'
      },
      instanceKey: ''
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
    border: 1px dotted #ddd;
    padding: 1px;
    position: relative;
    @enhance-color: #7d7d7d;
    &.sortable-drag, &.sortable-ghost {
      border: 1px solid @enhance-color;
      & > .instance-name {
        display: block;
      }
    }
    .instance-name {
      display: none;
      position: absolute;
      right: 0;
      padding: 4px;
      font-size: 12px;
      top:0;
      color: @enhance-color;
      border-bottom: 1px solid @enhance-color;
      border-left: 1px solid @enhance-color;
    }
  }
</style>
