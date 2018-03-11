import Vue from 'vue'
import store from './../store/index'
export default new Vue({
  methods: {
    viewportMouseout () {
      this.$store.commit('viewport/setCurrentHoverInstanceKey', null)
      this.$emit('viewport-mouseout')
    },
    domMouseHover (key) {
      this.$store.commit('viewport/setCurrentHoverInstanceKey', key)
      this.$emit('dom-mouse-hover', key)
    }
  },
  store
})
