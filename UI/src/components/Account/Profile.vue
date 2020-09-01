<template>
<div>
  <el-tabs type="border-card">
    <el-tab-pane label="基础信息">
      <div>
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span class="avatar-remind">(点击上传头像)</span>
      </div>
    </el-tab-pane>
    <el-tab-pane label="修改密码">角色管理</el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      imageUrl: ''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
/deep/ .avatar-remind {
  display: block;
  text-align: center;
  font-size: 0.8rem;
}
</style>
