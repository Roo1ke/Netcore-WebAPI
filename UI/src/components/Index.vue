<template>
<div id="app">
  <el-container :class="{'hideSidebar':!isopen}">
    <el-aside class="aside">
      <div class="sys-title"><span v-if="isopen">健康助手</span>
      </div>
      <el-menu efault-active="2" class="el-menu-vertical-demo" :collapse="!isopen" :collapse-transition="false">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="1-1">
            <router-link to="/UserManage"><span>用户管理</span></router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/HelloWorld"><span>用户管理</span></router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i class="el-icon-s-fold closeicon" v-if="isopen" @click="tooglemenu"></i>
        <i class="el-icon-s-unfold closeicon" v-if="!isopen" @click="tooglemenu"></i>
      </el-header>
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>

</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isopen: true
    }
  },
  methods: {
    tooglemenu() {
      this.isopen = !this.isopen;
    }
  }
}
</script>

<style>
html,
body,
#app,
.el-container {
  height: 100%;
}

.sys-title {
  color: rgb(191, 203, 217);
  text-align: center;
  font-size: 1.5rem;
  height: 60px;
  line-height: 60px;
}

.sys-title span {
  transition: width .18s;
  overflow: hidden;
  display: inline-block;
}

.el-submenu__title,
.el-submenu__title i {
  color: rgb(191, 203, 217);
}

.el-submenu__title:hover {
  background-color: #263445;
}

.aside {
  position: relative;
  background-color: rgb(48, 65, 86);
  -webkit-transition: width .28s;
  transition: width .28s;
}

.el-menu {
  border-right: none;
  background-color: rgb(48, 65, 86);
}

.el-menu-item {
  background: #1f2d3d;
  color: rgb(191, 203, 217)
}

.el-menu-item a {
  color: rgb(191, 203, 217)
}

.el-menu-item a:hover {
  color: #409EFF
}

.el-menu-item.is-active a {
  color: #409EFF
}

.el-menu-item:focus,
.el-menu-item:hover {
  background: #001528
}

.closeicon {
  height: 60px;
  font-size: 1.5rem;
  line-height: 60px;
  width: 60px;
  text-align: center;
}

.hideSidebar .el-aside,
.el-menu--collapse {
  width: 64px !important;
}

.hideSidebar .sys-title span {
  width: 0px !important;
}

.el-header {
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
}
</style>
