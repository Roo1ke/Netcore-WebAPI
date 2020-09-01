import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    userinfo:null,
    openTab:[],//所有打开的路由
    activeIndex:'/' //激活状态
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
    },
    add_tabs (state, data) {
      this.state.openTab.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.openTab) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.openTab.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index;
    },
  }
})

export default store