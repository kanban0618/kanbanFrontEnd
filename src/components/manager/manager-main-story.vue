<template>
    <div>

        <div class="head">
            <el-input v-model="input" placeholder="请输入Id" style="width: 10%; float: left" prefix-icon="el-icon-search"
                clearable></el-input>
            <el-button @click="selectStoryById" style="float: left; margin-left: 10px">Id查询</el-button>
            <el-button @click="allStory" type="primary" style="float: left;">查询全部</el-button>
            <el-button type="primary" @click="addButton" style="float: left">添加故事</el-button>
        </div>


        <div class="body">
            <el-table :data="storyList" style="width: 100%">
                <el-table-column prop="id" label="主键" width="50px"></el-table-column>
                <el-table-column prop="title" label="标题" width="80px"></el-table-column>
                <el-table-column prop="originator" label="发起人" width="80px"></el-table-column>
                <el-table-column prop="personInCharge" label="负责人" width="80px">
                    <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。 -->
                    <!-- slot插槽可以传递任何属性或html元素，但是在调用组件的页面中我们可以使用 template slot-scope="props"来获取插槽上的属性值，获取到的值是一个对象。 -->
                    <template slot-scope="scope" style="width: 100%;height: 100%">
                        <!-- scope.row获取当前行所有数据 作用域插槽获取当前行的数据（可以是图片连接如下：:src="scope.row.iconImgLarge"） -->
                        <el-avatar>
                            <img :src=scope.row.headimg style="width: 100%;height: 100%" />
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <el-table-column prop="estimationPoint" label="估算点" width="80px"></el-table-column>
                <el-table-column prop="flowId" label="工作流Id" width="80px"></el-table-column>
                <el-table-column prop="state" label="状态"></el-table-column>
                <el-table-column prop="releaseTime" label="发布时间"></el-table-column>
                <el-table-column prop="estComTime" label="估算完成时间"></el-table-column>
                <el-table-column prop="actComTime" label="实际完成时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="updateButton(scope.row.id, scope.row)" type="primary" icon="el-icon-edit"
                            circle>
                        </el-button>
                        <template>
                            <el-button type="danger" icon="el-icon-delete" @click="deleteStoryById(scope.row.id)"
                                circle>
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="margin: 10px 0">
            <el-dialog title="操作" :visible.sync="dialogVisible" width="30%">
                <el-form :model="editStory" label-width="120px">
                    <el-form-item label="标题">
                        <el-input v-model="editStory.title" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="发起人">
                        <el-input v-model="editStory.originator" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-input v-model="editStory.personInCharge" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="editStory.content" type="textarea" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="估算点">
                        <el-input v-model="editStory.estimationPoint" type="number" style="width: 80%">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="工作流Id">
                        <el-input v-model="editStory.flowId" type="number" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-input v-model="editStory.state" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间">
                        <el-input v-model="editStory.releaseTime" type="date" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="估算完成时间">
                        <el-input v-model="editStory.estComTime" type="date" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="实际完成时间">
                        <el-input v-model="editStory.actComTime" type="date" style="width: 80%"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveStory">确 定</el-button>
                </span>
            </el-dialog>
        </div>


        <div style="margin: 10px 0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[5, 10, 20]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
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
            storyList: [],
            id: 0,
            editStory: {},
            editUser: {},
        }
    },
    methods: {
        allStory() {
            //数据的函数的指向要指向vue
            reques.get('/story/page', {
                params: {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    search: this.search
                }
            })
                .then(res => {
                    this.storyList = res.data.data.records;

                    this.total = res.data.data.total;
                    // res.data.data.records
                }).catch(error => {
                    alert("error");
                    console.log(error);
                });

        },

        updateButton(id, row) {
            this.dialogVisible = true;
            this.editStory = {};
            console.log(id);
            console.log(row);
            this.editStory = JSON.parse(JSON.stringify(row))
        },

        addButton() {
            this.dialogVisible = true;
            this.id = '';
            this.editStory = {};
        },

        saveStory() {
            if (this.id) {
                reques
                    .post('/story/update', this.editStory)
                    .then(res => {
                        console.log(this.editStory.id)
                        console.log(res.data.data);
                        this.allStory();
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
                this.id++;
                reques.post('/story/save', this.editStory)
                    .then(res => {
                        console.log(res.data.data);
                        this.allStory();
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

        deleteStoryById(id) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    reques.get('/story/delete/' + id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.allStory();
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
        },

        selectStoryById() {
            reques.get('/story/findById/' + this.input)
                .then(res => {
                    if (res.data.data == null) {
                        this.$message({
                            type: 'info',
                            message: '未找到该用户'
                        });
                    } else {
                        console.log(this.storyList = [])
                        console.log(this.storyList.push(res.data.data))
                    }

                }).catch(function (error) {
                    console.log(error);
                });
        },

        //改变当前每页的个数触发
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.allStory();
        },

        //改变当前的页码触发
        handleCurrentChange(pageNum) {
            this.currentPage = pageNum;
            this.allStory();
        },

    },

    //自动启动
    created() {
        this.allStory();
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
</style>


