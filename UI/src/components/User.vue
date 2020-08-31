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
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
  <!--表单-->
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="dengmiQueryForm" label-width="100px" size="mini">
      <el-row>
        <el-col span="12">
          <el-form-item label="用户名(登录使用)">
            <el-input v-model="form.LoginName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="姓名">
            <el-input v-model="form.UserName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="手机号">
            <el-input v-model="form.MobilePhone" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    search() {
      console.log("A")
    },
    add() {
      this.dialogFormVisible = true
      this.title = '新增账户'
    }

  }
}
</script>

<style scoped>

</style>
