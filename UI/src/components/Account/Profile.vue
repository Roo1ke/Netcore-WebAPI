<template>
<div>
    <el-tabs type="border-card">
        <el-tab-pane label="基础信息" style="width:450px">
            <div>
                <el-upload class="avatar-uploader" :action="uploadurl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <el-image v-if="form.headerImgUrl" :src="Global.baseurl+(form.headerImgUrl==null?Global.defaultheader:form.headerImgUrl)" class="avatar" fit="fill"></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="avatar-remind">(点击上传头像)</span>
            </div>
            <el-form ref="loginform" :model="form" label-width="80px" :rules="rules" :hide-required-asterisk="true">
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobilePhone">
                    <el-input v-model="form.mobilePhone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
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
            imageUrl: '',
            form: {},
            user: {},
            uploadurl: 'https://localhost:44390/api/Utils/UpLoad',
            rules: {
                mobilePhone: [{
                    validator: (rule, value, callback) => {
                        if (!value) {
                            return callback(new Error('手机号码不能为空'));
                        }
                        this.$axios.post('/api/Systemuser/CheckMobilePhone', {
                            PKID: this.user.pkid,
                            mobilephone: this.form.mobilePhone
                        }, res => {
                            if (res.data) {
                                callback(new Error('该手机号码已存在'))
                            } else {
                                callback();
                            }
                        })
                    },
                    trigger: 'blur'
                }],
                userName: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }]
            },
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            //this.imageUrl = res;
            this.form.headerImgUrl = res;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        getbaseinfo() {
            this.user = this.$store.state.userinfo;
            this.$axios.get('/api/SystemUser/' + this.user.pkid, {}, res => {
                if (res.data.code == 1) {
                    this.form = res.data.data
                } else {
                    this.$message.error('获取信息失败');
                }
            })
        },
        onSubmit() {
            this.$refs.loginform.validate((valid) => {
                if (valid) {
                    this.$axios.post("/api/SystemUser", this.form, res => {
                        if (res.data.code == 1) {
                            this.$message.success(res.data.msg);
                            var user = this.$store.state.userinfo;
                            user.userName = this.form.userName;
                            user.mobilePhone = this.form.mobilePhone;
                            user.headerImgUrl = this.form.headerImgUrl;
                            window.sessionStorage.setItem("userinfo", JSON.stringify(user));
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                }
            });
        }
    },
    mounted() {
        this.getbaseinfo();
        console.log(this.Global.baseurl)
    },
}
</script>

<style scoped>
/deep/ .avatar-remind {
    display: block;
    text-align: center;
    font-size: 0.8rem;
    margin: 0.5rem 0 1rem;
    color: #aaa;
}

/deep/ .avatar-uploader {
    text-align: center;
}

/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

/deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

/deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

/deep/ .avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>
