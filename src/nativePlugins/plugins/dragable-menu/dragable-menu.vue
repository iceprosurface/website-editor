<template>
  <div class="dragable-menu" :class="{lock: lock}">
    <div class="menu-title">
      <div>
        拖拽菜单栏
      </div>
    </div>
    <div class="search-box">
      <input type="text" v-model="keyword" placeholder="Search...">
    </div>
    <div class="component-list" ref="dragableMenu">
      <component :is="key + '-ui'" v-for="key in keys" :key="key"
               :data-key="key"></component>
    </div>
  </div>
</template>

<script>
import _camelCase from 'lodash/camelCase'
export default {
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    keys () {
      let regex = new RegExp(this.keyword)
      return this.$store.state.application.components
        .filter(key => {
          return regex.test(key)
        })
    },
    lock () {
      return this.$store.state[this.__className__].lock
    }
  },
  mounted () {
    this.$store.commit(_camelCase(this.__className__) + '/registerDragMenus', this.$refs.dragableMenu)
  }
}
</script>
<style lang="less" type="text/less">
  .dragable-menu {
    position: relative;
    height: 100%;
    background-color: whitesmoke;
    .menu-title {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      height: 40px;
      font-size: 16px;
      align-items: center;
      color: #777;
      font-weight: bold;
      border-bottom: 1px solid #ddd;
    }
    .search-box {
      input {
        width: 100%;
        outline: none;
        padding: 5px 10px;
        font-size: 14px;
        color: #666;
        border-right: none;
        border-left: none;
        border-top: none;
        border-bottom: 1px solid #ddd;
        background-color: #fbfbfb;
      }
    }
    .ui-content {
      line-height: 34px;
      width: 100%;
      background: #eeeeee;
      padding: 0 10px;
      font-size: 14px;
      color: #666;
      transition: background-color .3s;
      border-bottom: 1px solid #ddd;
      &:hover {
        background-color: white;
      }
    }
    .dragging-content {
      display: none;
    }
    .ui-content {
      display: block;
    }
    .sortable-ghost {
      .ui-content {
        display: block;
      }
      .dragging-content {
        display: none;
      }
    }
  }
  .sortable-drag {
    .ui-content {
      display: none;
    }
    .dragging-content {
      display: block;
    }
  }
  .viewport {
    .sortable-drag, .sortable-ghost {
      .ui-content {
        display: none;
      }
      .dragging-content {
        display: block;
      }
    }
  }
</style>
