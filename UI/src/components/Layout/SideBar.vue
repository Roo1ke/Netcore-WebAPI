<template>
<div id="warper">
  <el-aside class="aside">
    <div class="sys-title"><span v-if="isopen">
        <router-link to="/"><span>健康助手</span></router-link>
      </span>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="!isopen" :collapse-transition="false">
      <el-menu-item index="0">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :index="item.label" v-for="(item,index) in usermenu" :key="index">
        <template slot="title">
          <i :class="[item.icon]"></i>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item :index="sub.path" v-for="(sub,sub_index) in item.children" :key="sub_index">
          <router-link :to="sub.path" v-if="sub.path!=null">
            <i :class="[sub.icon]"></i>
            <span>{{sub.label}}</span>
          </router-link>
          <i :class="[sub.icon]" v-if="sub.path==null"></i>
          <span v-if="sub.path==null">{{sub.label}}</span>
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
      usermenu: []
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
  mounted() {
    this.usermenu = this.$store.state.userinfo.menus
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
  width: 210px !important;
}

.el-menu {
  border-right: none;
  background-color: rgb(48, 65, 86);
}

.el-submenu .el-menu-item {
  background: #1f2d3d;

}

.el-menu-item {
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
