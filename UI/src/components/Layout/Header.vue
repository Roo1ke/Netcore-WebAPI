<template>
<div style="width:100%">
  <el-header>
    <i class="el-icon-s-fold closeicon" v-if="isopen" @click="tooglemenu"></i>
    <i class="el-icon-s-unfold closeicon" v-if="!isopen" @click="tooglemenu"></i>
    <div style="flex:1"></div>
    <div style="flex:0 0 100px" class="vertical-middle">
      <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
    </div>
  </el-header>
  <el-main>
    <transition>
      <router-view></router-view>
    </transition>
  </el-main>
</div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isopen: true,
      squareUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    tooglemenu() {
      this.$emit('collapse')
    }
  }
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
</style>
