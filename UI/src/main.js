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
import jsCookie from 'js-cookie'
Vue.prototype.$axios = axios;
Vue.prototype.$cookie = jsCookie;
Vue.prototype.Global = Global;
Vue.config.productionTip = false
Vue.prototype.validPermission = function (route,operation){
  var rs=false;
  var list = store.state.userinfo.permission.filter(e=>e.Path!=null&&e.Path.toUpperCase()==route.toUpperCase())
  if(list.length>0)
  {
    for(var i=0;i<list.length;i++)
    {
      if(list[i].operation.filter(e=>e.OperationName==operation).length>0)
      {
        rs=true;
        break;
      }

    }
   
  }
  return rs;
}
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
        if (jsCookie.get('userinfo') != undefined) {
            store.state.userinfo = JSON.parse(jsCookie.get('userinfo') );
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
              //登录后首页不用验证
              if(Global.whitePath.indexOf(to.path)>-1){next()}
              else if(store.state.userinfo.permission.filter(e=>e.Path!=null&&e.Path.toUpperCase()==to.path.toUpperCase()).length>0)
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