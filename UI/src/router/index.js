import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserManage from '@/components/UserManage'
import Index from '@/components/Index'
Vue.use(Router)

export default new Router({
  routes: [
    //登录页
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/components/Account/Login'),
      hidden: true
    },
    //首页
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage
    }
  ]
})
