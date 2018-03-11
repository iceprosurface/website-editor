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
