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
  created() {}
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

.avatar-uploader {
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
