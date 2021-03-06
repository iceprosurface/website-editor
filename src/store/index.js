import Vuex from 'vuex'
import Vue from 'vue'
import application from './application.js'
import viewport from './viewport.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    dataVersion: '0.1'
  },
  modules: {
    application,
    viewport
  }
})

store.commit('application/init', store)

export default store
