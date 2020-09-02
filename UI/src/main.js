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
Vue.prototype.Global=Global;
Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to,from,next) => {   
  if(window.sessionStorage.userinfo!=undefined)
  {
    store.state.userinfo=JSON.parse(window.sessionStorage.userinfo);
  }
  if(to.path=='/Login')
  {
    next();
  }else{
    if(!store.state.userinfo){
      next({path:'/Login'})
    }else{
      next();
    }
  }
 
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  // 引入store
  // components: { App },
  // template: '<App/>',
  render:h=>h(App)
})

