<template>
<div style="width:100%">
    <el-header>
        <i class="el-icon-s-fold closeicon" v-if="isopen" @click="tooglemenu"></i>
        <i class="el-icon-s-unfold closeicon" v-if="!isopen" @click="tooglemenu"></i>
        <div style="flex:1"></div>
        <div style="flex:0 0 100px" class="vertical-middle">
            <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
            <i class="el-icon-caret-bottom" style="margin-left:8px" @click="toggleAvatar"></i>
        </div>
    </el-header>
    <div class="colltools" v-show="showtools">
        <el-collapse-transition>
            <div v-show="showtools">
                <div class="transition-box">个人中心</div>
                <div class="transition-box">首页</div>
                <div class="transition-box-last">退出登录</div>
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
export default {
    name: 'Header',
    data() {
        return {
            isopen: true,
            squareUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            showtools: true
        }
    },
    methods: {
        tooglemenu() {
            this.$emit('collapse')
        },
        toggleAvatar() {
            this.showtools = !this.showtools
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

.colltools {
    position: fixed;
    right: 0.5rem;
    margin-top: 0.5rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    z-index: 10000;
    border: 1px solid #e6ebf5;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    background: #fff;
}

.transition-box {
    margin: 0.5rem 0
}
</style>
