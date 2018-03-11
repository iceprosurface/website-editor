import get from 'lodash/fp/get'
export var ui = {
  methods: {
    __registerEvent__ () {
      this.$el.removeEventListener('click', this.__uiClick__)
      this.$el.addEventListener('click', this.__uiClick__)
    },
    __uiClick__ () {
      this.$store.commit('viewport/uiClick', this.__className__)
    }
  },
  mounted () {
    this.__registerEvent__()
  }
}

export var editorToolMixins = {
  data: {
    field: null,
    value: null
  },
  computed: {
    currentInstanceKey () {
      return this.$store.state.viewport.currentInstanceKey
    }
  },
  props: {
    instanceInfo: {
      type: Object
    }
  },
  watch: {
    currentInstanceKey () {
      // 当选择的instancekey改变的时候自动变更当前选项
      this.initCurrentField()
    },
    value (newVal) {
      this.$store.commit('viewport/setInstanceProps', {
        vm: this.instanceInfo.vm,
        key: this.field,
        value: newVal
      })
    }
  },
  methods: {
    initCurrentField () {
      let props = this.instanceInfo.vm.$data
      let val = get(props, this.field)
      if (val) {
        this.value = val
      }
    }
  }
}
