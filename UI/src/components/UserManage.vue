<template>
<div>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="关键字">
      <el-input v-model="keywords" placeholder="输入关键字查询"></el-input>
    </el-form-item>
    <!-- <el-form-item label="活动区域">
      <el-select v-model="formInline.region" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="add">新增用户</el-button>
    </el-form-item>
  </el-form>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="loginName" label="登录名">
      </el-table-column>
      <el-table-column prop="userName" label="姓名">
      </el-table-column>
      <el-table-column prop="mobilePhone" label="电话号码">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editevent(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteevent(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currPageIndex" :page-size="currPageSize" layout="total, prev, pager, next" :total="totalcount">
    </el-pagination>
  </div>
  <!--表单-->
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="dengmiQueryForm" label-width="100px" size="mini" :rule="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名">
            <el-input v-model="form.loginName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户角色">
            <el-select v-model="form.roles" multiple placeholder="请选择用户角色">
              <el-option v-for="item in rolesList" :key="item.pkid" :label="item.roleName" :value="item.pkid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="form.userName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号">
            <el-input v-model="form.mobilePhone" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      keywords: '',
      title: '',
      form: {},
      dialogFormVisible: false,
      tableData: [],
      totalcount: 0,
      currPageIndex: 1,
      currPageSize: 10,
      rolesList: [],
      rules: {
        mobilePhone: [{
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('手机号码不能为空'));
            }
            var obj = {
              PKID: this.user.pkid,
              values: this.form.mobilePhone
            }
            this.$axios.post('/api/Systemuser/CheckMobilePhone', obj, res => {
              if (res.data) {
                callback(new Error('该手机号码已存在'))
              } else {
                callback();
              }
            })
          },
          trigger: 'blur'
        }],
        loginName: [{
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('登录名不能为空'));
            }
            var obj = {
              PKID: this.user.pkid,
              values: this.form.mobilePhone
            }
            this.$axios.post('/api/Systemuser/CheckLoginName', obj, res => {
              if (res.data) {
                callback(new Error('该登录名已存在'))
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
    }
  },
  methods: {
    //切换页
    handleCurrentChange(val) {
      this.currPageIndex = val;
      this.search();
    },
    //获取列表数据
    search() {
      this.$axios.get("/api/SystemUser/GetPage", {
        pageIndex: this.currPageIndex,
        pageSize: this.currPageSize,
        keywords: this.keywords
      }, res => {
        this.tableData = res.data.items;
        this.totalcount = res.data.totalCount;
      })
    },
    //打开新增弹窗
    add() {
      this.dialogFormVisible = true
      this.title = '新增账户'
      this.form = {}
    },
    //打开编辑弹窗
    editevent(item) {
      this.dialogFormVisible = true
      this.title = '编辑账户'
      this.form = JSON.parse(JSON.stringify(item))
      if (this.form.roles.length > 0) {
        this.form.roles = this.form.roles.split(',').map(Number);
      }
    },
    //删除数据
    deleteevent(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      });
    },
    //提交表单
    submit() {
      this.$refs.dengmiQueryForm.validate((valid) => {
        if (valid) {
          if (this.form.roles.length > 0) {
            this.form.roles = this.form.roles.join(',')
          }
          this.$axios.post("/api/SystemUser", this.form, res => {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg);
              this.dialogFormVisible = false;
              this.search();
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }
      })
    },
    initRoles() {
      this.$axios.get("/api/sysroles/getallroles", {}, res => {
        this.rolesList = res.data;
      })
    }
  },
  created() {
    this.search();
    this.initRoles();
  }
}
</script>

<style scoped>

</style>
