<template>
<div id="warper">
  <el-aside class="aside">
    <div class="sys-title"><span v-if="isopen">
        <router-link to="/"><span>健康助手</span></router-link>
      </span>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="!isopen" :collapse-transition="false">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item index="/UserManage">
          <router-link to="/UserManage"><span>用户管理</span></router-link>
        </el-menu-item>
        <el-menu-item index="/HelloWorld">
          <router-link to="/HelloWorld"><span>HelloWorld</span></router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</div>
</template>

<script>
export default {
  name: 'sideBar',
  props: ['isopen'],
  data() {
    return {

    }
  },
  computed: {
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
}
</script>

<style>
a {
  color: rgb(191, 203, 217)
}

a:hover {
  color: rgb(191, 203, 217)
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
  height: 100%;
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
</style>
