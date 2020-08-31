import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    userinfo:null
  },
  getters: {
    getStorage: function (state) {
      if (!state.userinfo) {
        state.userinfo = JSON.parse(localStorage.getItem(key))
      }
      return state.userinfo
    }
  },
  mutations: {
    $_setStorage (state, value) {
      state.userinfo = value
      localStorage.setItem(key, JSON.stringify(value))
    },
    $_removeStorage (state) {
      state.userinfo = null
      localStorage.removeItem(key)
    }
  }
})

export default store