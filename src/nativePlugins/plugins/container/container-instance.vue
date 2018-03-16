<template>
  <div class="container" :style="computedStyle"  data-slot-name='default'>
      <div class="instance-name" :class="{hover: currentHoverInstanceKey === instanceKey}">{{this.instanceKey}}</div>
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
    },
    currentHoverInstanceKey () {
      return this.$store.state.viewport.currentHoverInstanceKey
    }
  }
}
</script>
<style lang="less" type="text/less">
  @border: #ddd;
  .container {
    border: 1px dotted ;
    padding: 1px;
    position: relative;
    @enhance-color: #7d7d7d;
    &.sortable-drag, &.sortable-ghost {
      border: 1px solid @enhance-color;
      box-shadow:2px 2px 3px #aaaaaa;
      & > .instance-name {
        display: block;
        border-left: 1px solid @enhance-color;
        border-bottom: 1px solid @enhance-color;
        &.hover {
          opacity: 1;
          border-left: 1px solid @enhance-color;
          border-bottom: 1px solid @enhance-color;
        }
      }
    }
    .instance-name {
      &.hover {
        opacity: 1;
        border-left: 1px solid #23b7e5;
        border-bottom: 1px solid #23b7e5;
      }
      transition: opacity 0.35s ease;
      user-select: none;
      z-index: 1000;
      background: #ffffff;
      position: absolute;
      opacity: 0;
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
