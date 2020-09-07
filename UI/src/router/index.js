import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserManage from '@/components/UserManage'
import Index from '@/components/Layout/Index'
import Profile from '@/components/Account/Profile'
import Menu from '@/components/System/Menu'
import Role from '@/components/System/Role'
import NoAuth from '@/components/Error/NoAuth'
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
      name: '首页',
      component: Index,
      children:[
        {
          path: '/HelloWorld',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
          path: '/UserManage',
          name: '用户管理',
          component: UserManage
        }, 
        {
          path: '/Profile',
          name: '个人中心',
          component: Profile
        },
        {
          path: '/Menu',
          name: '菜单管理',
          component: Menu
        },
        {
          path: '/Role',
          name: '角色管理',
          component: Role
        },
        {
          path: '/Error/401',
          name: '401',
          component: NoAuth
        },
      ]
    },
  ]
})
