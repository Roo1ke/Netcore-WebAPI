<template>
<div>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>菜单预览</span>
                </div>

            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card class="box-card">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="关键字">
                        <el-input v-model="keywords" placeholder="输入关键字查询"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="add">新增菜单</el-button>
                    </el-form-item>
                </el-form>
                <div>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="menuName" label="菜单名称">
                        </el-table-column>
                        <el-table-column prop="parentName" label="父级菜单">
                        </el-table-column>
                        <el-table-column prop="icon" label="图标">
                        </el-table-column>
                        <el-table-column prop="path" label="路径">
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
            </el-card>
        </el-col>
    </el-row>
    <!--表单-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="menuForm" label-width="100px" size="mini">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="菜单名称">
                        <el-input v-model="form.menuName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="父级菜单">
                        <el-select v-model="form.parentID" placeholder="选择父级菜单">
                            <el-option :label="i.menuName" :value="i.pkid" v-for="(i,index) in parentList" :key="index" v-if="i.pkid!=form.pkid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="菜单图标">
                        <el-input placeholder="点击选择" v-model="form.icon" autocomplete="off" @click.native="openIcon()" readonly="readonly">
                            <i slot="prefix" class="el-input__icon" :class="[form.icon]"></i>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="菜单路径">
                        <el-input v-model="form.path" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
        <el-dialog title="图标选择" :visible.sync="showIcon" append-to-body id="dia">
            <el-row class="el-row-border">
                <el-col :span="8" v-for="(item,index) in iconList" :key="index" class="iconlist" :class="{'checked':item==form.icon}" @click.native="chooseicon(item)">
                    <i :class="[item]"></i>
                </el-col>
            </el-row>
        </el-dialog>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
            keywords: '',
            title: '',
            form: {},
            dialogFormVisible: false,
            showIcon: false,
            tableData: [],
            totalcount: 0,
            currPageIndex: 1,
            currPageSize: 10,
            parentList: [],
            iconList: ['el-icon-setting', 'el-icon-user', 'el-icon-goods', 'el-icon-help', 'el-icon-camera', 'el-icon-video-camera', 'el-icon-bell', 'el-icon-s-order', 'el-icon-s-platform', 'el-icon-s-home', 'el-icon-s-promotion', 'el-icon-share', 'el-icon-date', 'el-icon-folder', 'el-icon-shopping-cart-2']
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
            this.$axios.get("/api/SysMenu/GetPage", {
                pageIndex: this.currPageIndex,
                pageSize: this.currPageSize,
                keywords: this.keywords
            }, res => {
                this.tableData = res.data.items;
                this.totalcount = res.data.totalCount;
            })
        },
        //初始化数据
        initData() {
            this.$axios.get('/api/SysMenu', {}, res => {
                this.parentList = res.data;
            })

        },
        //打开新增弹窗
        add() {
            this.form = {};
            this.dialogFormVisible = true
            this.title = '新增菜单'
        },
        //打开编辑弹窗
        editevent(item) {
            this.form = JSON.parse(JSON.stringify(item))
            this.dialogFormVisible = true
            this.title = '编辑菜单'
        },
        openIcon() {
            this.showIcon = true;

        },
        chooseicon(item) {
            this.form.icon = item;
            this.showIcon = false;
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
            this.$axios.post("/api/SysMenu/Add", this.form, res => {
                if (res.data.code == 1) {
                    this.$message.success(res.data.msg);
                    this.search();
                    this.dialogFormVisible = false;
                } else {
                    this.$message.error(res.data.msg);
                }
            })

        }
    },
    created() {
        this.initData();
        this.search();
    }
}
</script>

<style scoped>
/deep/ .iconlist {
    border-top: 1px solid;
    border-left: 1px solid;
    text-align: center;
    padding: 1rem 0;
    font-size: 1.5rem;
}

/deep/ .el-row-border {
    border-right: 1px solid;
    border-bottom: 1px solid;
}

/deep/ .el-row-border :hover {
    cursor: pointer
}

/deep/ .checked i {
    color: #409EFF
}
</style>
