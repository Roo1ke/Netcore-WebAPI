<template>
<div id="warper">
  <el-container :class="{'hideSidebar':!isopen}">
    <SideBar :isopen="isopen"></SideBar>
    <el-container>
      <Header @collapse="collapse"></Header>

    </el-container>
  </el-container>

</div>
</template>

<script>
import SideBar from '@/components/Layout/SideBar'
import Header from '@/components/Layout/Header'
export default {
  data() {
    return {
      isopen: true
    }
  },
  methods: {
    collapse() {
      this.isopen = !this.isopen
    }
  },
  components: {
    SideBar: SideBar,
    Header: Header
  },
  created() {
    console.log('渲染主页')
  }
}
</script>

<style>
html,
body,
#app,
#warper,
.el-container {
  height: 100%;
}

.hideSidebar .el-aside,
.el-menu--collapse {
  width: 64px !important;
}

.hideSidebar .sys-title span {
  width: 0px !important;
}

.vertical-middle {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
</style>
