import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        userinfo: null,
        openTab: [], //所有打开的路由
        activeIndex: '' //激活状态
    },
    getters: {
        getStorage: function(state) {
            if (!state.userinfo) {
                state.userinfo = JSON.parse(localStorage.getItem(key))
            }
            return state.userinfo
        }
    },
    mutations: {
        $_setStorage(state, value) {
            state.userinfo = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        $_removeStorage(state) {
            state.userinfo = null
            localStorage.removeItem(key)
        },
        add_tabs(state, data) {
            if (this.state.openTab.filter(e => e.route == data.route).length > 0) {
                return false;
            }
            this.state.openTab.push(data);
            window.sessionStorage.setItem("openTab", JSON.stringify(this.state.openTab))
        },
        // 删除tabs
        delete_tabs(state, route) {
            let index = 0;
            for (let option of state.openTab) {
                if (option.route === route) {
                    break;
                }
                index++;
            }
            this.state.openTab.splice(index, 1);
            window.sessionStorage.setItem("openTab", JSON.stringify(this.state.openTab))
        },
        // 设置当前激活的tab
        set_active_index(state, index) {
            this.state.activeIndex = index;
            window.sessionStorage.setItem("activeIndex", this.state.activeIndex)
        },
    }
})

export default store