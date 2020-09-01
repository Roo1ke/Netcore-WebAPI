<template>
<body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px" ref="loginform" :model="loginForm">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username" :rules="[{ required: true, message: '账号不能为空'}]">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</body>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    login() {
      this.$refs.loginform.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$axios.post('/api/account/login', {
            account: this.loginForm.username,
            pwd: this.loginForm.password
          }, res => {
            this.loading = false;
            if (res.data.code == 1) {
              //登录成功
              var userinfo = res.data.data;
              this.$store.state.userinfo = userinfo;
              window.sessionStorage.setItem("userinfo", JSON.stringify(userinfo));
              this.$router.replace({
                path: '/'
              })
            } else {
              this.$message.error(res.data.msg);
            }
            // if (successResponse.data.code === 200) {

            // }
          })
        }
      });
    }
  },
  created() {
    //回车键直接登录
    let that = this;
    document.onkeypress = function (e) {
      var keycode = document.all ? event.keyCode : e.which;
      //需要注意的：that.$route.path==''/login'的作用是如果不判断，回车可能所有页面都生效，也就是无论在哪个页面敲回车都会直接登录
      if (that.$route.path == '/Login' && keycode == 13) {
        that.login();
      }
    };
  }
}
</script>

<style scoped>
#poster {
  background: url("@~/static/bg.gif");
  background-position: center;
  height: 100%;
  width: 100%;
  /*background-size: cover;*/
  position: fixed;
  display: flex;
  align-items: center;
}

body {
  margin: 0px;
  padding: 0;
}

.errmsg {
  color: #f56c6c;
  display: block;
  text-align: center;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
