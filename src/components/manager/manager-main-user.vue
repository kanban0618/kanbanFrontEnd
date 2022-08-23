<template>
    <div>

        <div class="head">
            <el-input v-model="input" placeholder="请输入Id" style="width: 10%; float: left" prefix-icon="el-icon-search"
                      clearable></el-input>
            <el-button @click="selectUserById" style="float: left; margin-left: 10px">Id查询</el-button>
            <el-button @click="allUser" type="primary" style="float: left;">查询全部</el-button>
            <el-button type="primary" @click="addButton" style="float: left">添加用户</el-button>
        </div>


        <div class="body">
            <el-table :data="userList" style="width: 100%">
                <el-table-column prop="id" label="主键">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="headimg" label="头像">
                    <template slot-scope="scope">
<!--                        <el-avatar v-if="scope.row.headimg == null">-->
<!--                            {{scope.row.name}}-->
<!--                        </el-avatar>-->
<!--                        <el-avatar v-else>-->
<!--                            <img :src=scope.row.headimg style="width: 100%;height: 100%" />-->
<!--                        </el-avatar>-->
                        <el-avatar :size="60" :src=scope.row.headimg class="headimgsize"  @error="errorHandler" >
                            {{scope.row.name}}
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户账号">
                </el-table-column>
                <el-table-column prop="password" label="密码">
                </el-table-column>
                <el-table-column prop="jobno" label="工号">
                </el-table-column>
                <el-table-column prop="position" label="职位">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="updateButton(scope.row.id, scope.row)" type="primary" icon="el-icon-edit"
                                   circle>
                        </el-button>
                        <template>
                            <el-button type="danger" icon="el-icon-delete" @click="deleteUserById(scope.row.id)" circle>
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="margin: 10px 0">
            <el-dialog title="操作" :visible.sync="dialogVisible" width="30%">
                <el-form :model="editUser" label-width="120px">
                    <el-form-item label="姓名">
                        <el-input v-model="editUser.name" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="用户账号">
                        <el-input v-model="editUser.username" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="editUser.password" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="工号">
                        <el-input v-model="editUser.jobno" type="number" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-input v-model="editUser.position" style="width: 80%"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveUser">确 定</el-button>
                </span>
            </el-dialog>
        </div>


        <div style="margin: 10px 0">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[5, 10, 20]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </div>


    </div>
</template>

<script>

    // axios.<method> will now provide autocomplete and parameter typings
    import reques from "@/utils/respone";

    export default {
        name: "manager",
        data() {
            return {
                input: '',
                currentPage: 1,
                pageSize: 10,
                search: '',
                total: 0,
                dialogVisible: false,
                userList: [],
                id: 0,
                editUser: {},
            }
        },
        methods: {
            errorHandler() {
                return true
            },
            updateButton(id, row) {
                this.dialogVisible = true;
                this.editUser = {};
                console.log(id);
                console.log(row);
                this.editUser = JSON.parse(JSON.stringify(row))
            },

            addButton() {
                this.dialogVisible = true;
                //清除上次输入
                this.id = '';
                this.editUser = {};
            },

            //修改和添加
            saveUser() {
                //有id为修改
                if (this.id) {
                    reques
                        .post('/user/update', this.editUser)
                        .then(res => {
                            console.log(this.editUser.id)
                            console.log(res.data.data);
                            this.allUser();
                            this.dialogVisible = false;
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: 'error',
                                message: '修改失败!'
                            });
                        })
                } else {
                    //无id为添加
                    this.id++;
                    reques.post('/user/save', this.editUser)
                        .then(res => {
                            console.log(res.data.data);
                            this.allUser();
                            this.dialogVisible = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: 'error',
                                message: '添加失败!'
                            });
                        })
                }
            },

            allUser() {
                //数据的函数的指向要指向vue
                reques.get('/user/page', {
                    params: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        search: this.search
                    }
                })
                    .then(res => {
                        this.userList = res.data.data.records;
                        this.total = res.data.data.total;
                    }).catch(error => {
                    alert("error");
                    console.log(error);
                });

            },

            deleteUserById(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        reques.get('/user/delete/' + id)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.allUser();
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })
            },

            selectUserById() {
                reques.get('/user/findById/' + this.input)
                    .then(res => {
                        if (res.data.data == null) {
                            alert("未找到该用户!")
                        } else {
                            console.log(this.userList = [])
                            console.log(this.userList.push(res.data.data))
                        }

                    }).catch(function (error) {
                    console.log(error);
                });
            },

            //改变当前每页的个数触发
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.allUser();
            },

            //改变当前的页码触发
            handleCurrentChange(pageNum) {
                this.currentPage = pageNum;
                this.allUser();
            },

        },

        //自动启动
        created() {
            this.allUser();
        }

    }
</script>

<style scoped>
    .head {
        margin-bottom: 10px;
        height: 35px;
    }

    .body {
        height: auto;
    }

    .headimgsize /deep/ img {
        width: 100%;
    }
</style>
