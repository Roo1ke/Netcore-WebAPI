<template>
<div>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="关键字">
      <el-input v-model="keywords" placeholder="输入关键字查询"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="add">新增角色</el-button>
    </el-form-item>
  </el-form>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="roleName" label="角色名称">
      </el-table-column>
      <el-table-column prop="description" label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-s-cooperation" size="mini" @click="permission(scope.row)">权限设置</el-button>
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
    <el-form :model="form" ref="dengmiQueryForm" label-width="100px" size="mini">
      <el-row>
        <el-col :span="24">
          <el-form-item label="角色名称">
            <el-input v-model="form.roleName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 权限 -->
  <el-dialog title="角色权限设置" :visible.sync="showMenuSetting" width="30%" :close-on-click-modal="false">
    <el-tree :data="menuList" ref="tree" :check-on-click-node="1==1" show-checkbox node-key="id" :default-checked-keys="checkedKeys" default-expand-all>
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showMenuSetting=false">关 闭</el-button>
      <el-button type="primary" @click="submitMenusetting">提 交</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'Role',
  data() {
    return {
      keywords: '',
      title: '',
      form: {},
      dialogFormVisible: false,
      showMenuSetting: false,
      tableData: [],
      totalcount: 0,
      currPageIndex: 1,
      currPageSize: 10,
      rules: {
        roleName: [{
          required: true,
          message: '角色名称不能为空',
          trigger: 'blur'
        }]
      },
      menuList: [],
      checkedKeys: [],
      currItem: {},
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
      this.$axios.get("/api/SysRoles/GetPage", {
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
      this.title = '新增角色'
    },
    //打开编辑弹窗
    editevent(item) {

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
          this.$axios.post("/api/SysRoles/Add", this.form, res => {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg);
              this.dialogFormVisible = false;
              this.search();
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }
      });
    },
    permission(item) {
      this.currItem = item;
      if (this.currItem.permissionIDS != null) {
        this.checkedKeys = this.currItem.permissionIDS.split(',');
      } else {
        this.checkedKeys = [];
      }
      this.$axios.get('/api/SysMenu/InitTree', {}, res => {
        this.menuList = res.data;
        this.showMenuSetting = true;
      })
    },
    submitMenusetting() {
      var permissions = this.$refs.tree.getCheckedKeys().join(',');
      var pkid = this.currItem.pkid;
      var obj = {
        PKID: pkid,
        values: permissions
      }
      this.$axios.post('/api/SysRoles/SaveRolePerrmission', obj, res => {
        if (res.data.code == 1) {
          this.$message.success(res.data.msg);
          this.showMenuSetting = false;
          this.search();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    }
  },
  created() {
    this.search();
  }
}
</script>
