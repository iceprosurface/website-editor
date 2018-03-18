<template>
  <div class="box-editor">
    <div class="form-group">
      <input type="text" v-model="currentStyles.paddingTop" @input="changeHandler('paddingTop')">
    </div>
    <div class="form-group">
      <input type="text" v-model="currentStyles.paddingLeft" @input="changeHandler('paddingLeft')">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      default: 'styles'
    },
    instance: {
      required: true
    }
  },
  computed: {
    instanceKey () {
      return this.$store.state.viewport.currentInstanceKey
    }
  },
  watch: {
    instanceKey () {
      // init
      this.refreshStyles()
    }
  },
  methods: {
    __initStyle__ (field) {
      if (this.instance.vm.$data.styles && typeof this.instance.vm.$data.styles[field] !== 'undefined') {
        this.currentStyles[field] = parseInt(this.instance.vm.$data.styles[field])
      } else {
        this.currentStyles[field] = 0
      }
    },
    changeHandler (field) {
      this._setDataCurrentStyle(field, this.currentStyles[field])
    },
    _setDataCurrentStyle (field, value) {
      this.currentStyles[field] = value
      let copyStyle = Object.keys(this.currentStyles).reduce((previous, next) => {
        previous[next] = this.currentStyles[next] + 'px'
        return previous
      }, {})
      this.$store.commit('viewport/setInstanceProps', {
        vm: this.instance.vm,
        path: 'styles',
        value: {
          ...copyStyle
        }
      })
    },
    refreshStyles () {
      this.__initStyle__('paddingLeft')
      this.__initStyle__('paddingTop')
    }
  },
  data () {
    return {
      currentStyles: {
        paddingTop: 0,
        paddingLeft: 0
      }
    }
  }
}
</script>
<style lang="less" type="text/less">
  .box-editor {
  }
</style>
