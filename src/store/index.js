import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 记事本
const notepad = {
  namespaced: true,
  state: {
    content: ''
  },
  getters: {},
  mutations: {},
  actions: {}
}

export default new Vuex.Store({
  modules: {
    tonotepad: notepad
  }
})
