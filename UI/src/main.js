// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from './index.js';
import store from './store/index.js'
import Global from './utils/global.js'
Vue.prototype.$axios = axios;
Vue.prototype.Global = Global;
Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
        if (window.sessionStorage.userinfo != undefined) {
            store.state.userinfo = JSON.parse(window.sessionStorage.userinfo);
        }

        if (window.sessionStorage.openTab != undefined) {
            store.state.openTab = JSON.parse(window.sessionStorage.openTab);
        } else {
            window.sessionStorage.openTab = JSON.stringify([{ name: '首页', route: '/' }])
        }

        if (window.sessionStorage.activeIndex != undefined) {
            store.state.activeIndex = window.sessionStorage.activeIndex;
        } else {
            window.sessionStorage.activeIndex = '/'
        }

        if (to.path.toUpperCase() == '/LOGIN'||to.path.toUpperCase()=='/ERROR/401') {
            next();
        } else {
            if (!store.state.userinfo) {
                next({ path: '/Login' })
            } else {
              //权限验证
              if(store.state.userinfo.permission.filter(e=>e.path==to.path).length>0)
              {
                next();
              }else{

                next({ path: '/Error/401' })
              }
                
            }
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, // 引入store
    // components: { App },
    // template: '<App/>',
    render: h => h(App)
})