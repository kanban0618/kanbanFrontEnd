<template xmlns="">
  <div>
    <!--  搜索栏-->
    <div class="taskHead">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="state" style="width: 200px;float: left">
      </el-input>
      <el-button @click="findByName" style="float: left;margin-left: 10px">查找</el-button>
      <manager-public-add-task style="float: left;margin-left: 10px"></manager-public-add-task>
      <el-popover placement="top-start" width="100" trigger="hover">
        <h1>已完成</h1><br>
        <el-progress type="circle" :percentage="taskActiveCount" status="success"></el-progress>
        <br>
        <h1>未完成</h1><br>
        <el-progress type="circle" :percentage="taskFinishedCount" status="warning"></el-progress>
        <el-button style="float: left;margin-left: 10px" slot="reference">当前任务状态</el-button>
      </el-popover>
    </div>
    <!--  面板-->
    <div class="taskBody">
      <el-empty description="这里什么都没有" v-show="tableData.length < 1"></el-empty>
      <el-table v-show="tableData.length > 0" :data="tableData">
        <el-table-column prop="id" label="id" fixed width="60">
        </el-table-column>
        <el-table-column prop="title" label="标题" fixed>
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="po" label="发布人">
        </el-table-column>
        <el-table-column prop="sponsor" label="负责人">

          <template slot-scope="scope">
            <el-avatar class="userHeadImg" v-if="scope.row.sponsorList[0] == null">
              {{ scope.row.sponsor }}
            </el-avatar>
            <el-avatar class="userHeadImg" v-else :fit="fit" :src="scope.row.sponsorList[0].headimg">
              {{ scope.row.sponsor }}
            </el-avatar>
            <!--            <el-avatar >-->
            <!--              {{ scope.row.sponsor }}-->
            <!--            </el-avatar>-->
          </template>

        </el-table-column>
        <el-table-column prop="publishtime" label="发布时间" :formatter="dateFormat" width="150">
        </el-table-column>
        <el-table-column prop="ectime" label="预计时间" :formatter="dateFormat" width="150">
        </el-table-column>
        <el-table-column prop="actime" label="完成时间" :formatter="dateFormat" width="150">
        </el-table-column>
        <el-table-column prop="storyid" label="故事id">
        </el-table-column>
        <el-table-column prop="estimate" label="估算点">
        </el-table-column>
        <el-table-column prop="flowid" label="工作流id">
        </el-table-column>
        <el-table-column prop="state" label="任务状态">
        </el-table-column>
        <el-table-column prop="sort" label="排序点数">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <!--            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button><br>-->
            <el-button @click="EditTask(scope.row)" type="primary" icon="el-icon-edit" circle>
            </el-button>
            <template>
              <el-button type="danger" icon="el-icon-delete" @click="taskDelete(scope.row.id)" circle>
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <edit-task :fh_editTask="snapTask" ref="editTask"></edit-task>
  </div>
</template>

<script>
import reques from '@/utils/respone';
export default {
  name: "manager-main-task",
  components: {
    ManagerPublicAddTask: () => import('./manager-public-add-task'),
    editTask: () => import('./manager-public-edit-task')
  },
  data() {
    return {
      tableData: [],
      fit: "fill",//用户头像的内容填充样式
      state: '',
      taskCount: 0,
      taskActiveCount: 0,
      taskFinishedCount: 0,
      snapTask: {
        id: 0,
        title: '',
        content: '',
        po: '',
        sponsor: '',
        publishtime: '',
        ectime: '',
        actime: '',
        storyid: '',
        estimate: '',
        flowid: '',
        state: '',
        sort: ''
      }
    }
  },
  methods: {
    async taskAll() {
      const { data: res } = await reques.get("/task/all");
      if (res.result === true) {
        this.tableData = res.data;
        await this.taskStateAll();
      }
    },
    dateFormat(row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        var date = new Date(daterc);
        var year = date.getFullYear();
        /* 在日期格式中，月份是从0开始，11结束，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      }
    },
    taskDelete(id) {
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          reques.get("/task/delete/" + id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.taskAll();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
    },

    async taskStateAll() {
      const { data: count } = await reques.get("/task/count");
      const { data: activeCount } = await reques.get("/task/activeCount");
      const { data: finishedCount } = await reques.get("/task/finishedCount");
      this.taskCount = count.data;
      this.taskActiveCount = (activeCount.data / count.data) * 100;
      this.taskFinishedCount = (finishedCount.data / count.data) * 100;
    },
    //表单按钮
    handleClick(row) {
      console.log(row);
    },
    //修改任务触发
    EditTask(task) {
      this.snapTask = task;
      this.$refs.editTask.hai();
    },
    //搜索框
    async findByName() {
      if (this.state.length < 1) {
        await this.taskAll();
      } else {
        const { data: res } = await reques.get("/task/findByName/" + this.state);
        if (res.result === true)
          this.tableData = res.data;
        // console.log(this.tableData);
      }
    },
    //用户头像加载失败显示用户姓名
    errorHandler() {
      return true
    },//获取表格用户头像
    userImg() {
      // for (let idx in this.tableData){
      //   const {data: res} = await reques.get("/user/findById/" + idx.id);
      //   console.log(res.data);
      // }
      // return require("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png");
    },


  },
  //自启动
  created() {
    this.taskAll();
  }
}
</script>

<style scoped>
.taskHead {
  /*border: 1px solid red;*/
  margin-bottom: 10px;
  height: 35px;
}

.taskBody {
  height: auto;
}

.userHeadImg /deep/ img {
  width: 100%;
}
</style>