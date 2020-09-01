<template>
<div style="width:100%">
  <el-header>
    <i class="el-icon-s-fold closeicon" v-if="isopen" @click="tooglemenu"></i>
    <i class="el-icon-s-unfold closeicon" v-if="!isopen" @click="tooglemenu"></i>
    <div style="flex:1"></div>
    <div style="flex:0 0 100px" class="vertical-middle">
      <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
      <i class="el-icon-caret-bottom" id="toggleAvatar" style="margin-left:8px" @click="toggleAvatar"></i>
    </div>
  </el-header>
  <el-tabs v-model="activeIndex" type="card" closable @tab-remove="removeTab" @tab-click='tabClick'>
    <el-tab-pane v-for="(item, index) in openTab" :key="item.name" :label="item.name" :name="item.route">
    </el-tab-pane>
  </el-tabs>
  <div class="colltools" v-clickoutside="handleclickoutside">
    <el-collapse-transition>
      <div v-show="showtools">
        <div class="transition-box">
          <router-link to="/Profile"><span>个人中心</span></router-link>
        </div>
        <div class="transition-box">
          <router-link to="/"><span>首页</span></router-link>
        </div>
        <div class="transition-box">退出登录</div>
      </div>
    </el-collapse-transition>
  </div>
  <el-main>
    <transition>
      <router-view></router-view>
    </transition>
  </el-main>
</div>
</template>

<script>
import clickoutside from '@/utils/clickoutside'
export default {
  name: 'Header',
  data() {
    return {
      isopen: true,
      squareUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      showtools: false,
      editableTabsValue: '2',
    }
  },
  watch: {
    '$route'(to, from) {
      this.showtools = false;
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
      let flag = false;
      for (let item of this.openTab) {
        if (item.name === to.name) {
          this.$store.commit('set_active_index', to.path)
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {
          route: to.path,
          name: to.name
        });
        this.$store.commit('set_active_index', to.path);
      }
    }
  },
  computed: {
    openTab() {
      return this.$store.state.openTab;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  methods: {
    tooglemenu() {
      this.isopen = !this.isopen
      this.$emit('collapse')
    },
    toggleAvatar() {
      this.showtools = !this.showtools
    },
    handleclickoutside(el) {
      if (el.target.id == 'toggleAvatar') {
        return false;
      }
      if (this.showtools) {
        this.showtools = false;
      }
    },
    //tab标签点击时，切换相应的路由
    tabClick(tab) {
      this.$router.push({
        path: this.activeIndex
      });
    },
    //移除tab标签
    removeTab(targetName) {
      //首页不删
      if (targetName == '/') {
        return
      }
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          this.$store.commit('set_active_index', this.openTab[this.openTab.length - 1].route);
          this.$router.push({
            path: this.activeIndex
          });
        } else {
          this.$router.push({
            path: '/'
          });
        }
      }
    }
  },
  directives: {
    clickoutside
  },
  mounted() {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    if (this.$route.path !== '/') {
      this.$store.commit('add_tabs', {
        route: '/',
        name: '首页'
      });
      this.$store.commit('add_tabs', {
        route: this.$route.path,
        name: this.$route.name
      });
      this.$store.commit('set_active_index', this.$route.path);
    } else {
      this.$store.commit('add_tabs', {
        route: '/',
        name: '首页'
      });
      this.$store.commit('set_active_index', '/');
    }
  },
}
</script>

<style>
.el-header {
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  display: flex;
}

.closeicon {
  height: 60px;
  font-size: 1.5rem;
  line-height: 60px;
  flex: 0 0 60px;
  width: 60px;
  text-align: center;
}

.colltools {
  position: fixed;
  right: 0.5rem;
  top: 68px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  z-index: 10000;
  border: 1px solid #e6ebf5;
  border-radius: 4px;
  background: #fff;
}

.transition-box {
  padding: 0.25rem 1rem;
  margin: 0.5rem 0;
}

.transition-box a {
  color: #606266;
}

.transition-box:last-child {
  margin-top: 0.5rem;
  border-top: 1px solid #e6ebf5;
  padding: 0.25rem 1rem;
}

.transition-box:hover {
  background-color: #e8f4ff;
  color: #46a6ff;
  cursor: pointer;
}

.transition-box a:hover {
  color: #46a6ff;
}
</style>
