<template xmlns="">
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item style="font-size: 22px">工作流管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <!-- 卡片视图区域 -->
    <div class="flowHead">
      <!-- 搜索与添加区域 -->
      <el-input placeholder="请输入ID或查找内容" prefix-icon="el-icon-search" v-model="state"
        style="width: 200px;float: left;margin-right: 8px" round>
      </el-input>

      <el-button @click="findFlowById" style="float: left; margin-right: 2px" slot="append" icon="el-icon-search"
        type="primary" round>Id搜索</el-button>
      <el-button @click="findByName" style="float: left;" slot="append" icon="el-icon-search" type="primary" round>内容搜索
      </el-button>
      <!--      弹窗-->
      <managerpublicflow style="float:left;margin-left: 10px" @work="getwork" @succeed="succeeds"></managerpublicflow>


    </div>
    <!-- 用户列表区域 -->
    <div class="flowBody">
      <el-table :data="flowList" style="width: 100%" height="500">

        <el-table-column prop="id" label="id" width="80" sortable>
          <template slot-scope="scope">
            <el-input v-model="scope.row.id"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="workname" label="工作流名称" width="280">
          <template slot-scope="scope">
            <el-input v-model="scope.row.workname" placeholder="请输入工作流名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="类别" width="280">
          <template slot-scope="scope">
            <el-input v-model="scope.row.category" placeholder="请输入类别"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="capacity" label="在制品限制" width="280">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.capacity" :min="1" :max="10" placeholder="输入在制品限制" size="small"
              style="width: 9.9rem"></el-input-number>
          </template>

        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="upDataFlow(scope.$index, scope.row)" type="primary" icon="el-icon-edit" circle>
            </el-button>
            <el-button @click="removeUserById(scope.row.id)" type="danger" icon="el-icon-close" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
import reques from "@/utils/respone";
import managerpublicflow from './manager-flow-from.vue'

export default {
  name: "manager-flow.vue",
  components: {
    managerpublicflow: () => import('./manager-flow-from.vue')
  },
  data() {
    return {
      flowList: [],
      flag: false,
      state: '',
      flows: {
        id: '',
        workname: '',
        category: '',
        capacity: '',
      },
    }
  },
  methods: {
    //查询所有
    async flowAll() {
      const { data: res } = await reques.get("/flow/all");
      if (res.result === true) {
        this.flowList = res.data
      }
    },
    succeeds(val) {
      this.flag = val
    },
    //显示添加工作流
    getwork(val) {
      //接收子组件传过来的值
      console.log(val)
      //实时添加工作流
      this.flowList.push(val)
    },
    //查找ID
    async findFlowById() {
      reques.get('/flow/findById/' + this.state)
        .then(res => {
          if (res.data.data == null) {
            console.log(this.flowList = [])
            this.$message('未找到');
          } else {
            console.log(this.flowList = [])
            console.log(this.flowList.push(res.data.data))
          }
        });
    },

    //查找内容
    async findByName() {
      const { data: res } = await reques.get("/flow/findByName/" + this.state)
      if (res.result === false) {
        console.log(this.flowList = [])
      } else {
        this.flowList = res.data;
      }
    },
    removeUserById(id) {
      console.log(id)
      // 弹框询问用户是否删除数据
      this.$confirm('此操作将永久删除该工作流, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
        reques({
          method: "get",
          url: "/flow/delete/" + id,
        }).then(response => {
          console.log(response.data.data);
          this.flowList = this.flowList.filter(item => item.id != id)
        })
      })
        .catch(
          () => {
            this.$message({
              type: 'info',
              message: '取消删除'
            })
          }
        )
    },
    upDataFlow(index) {
      console.log(this.flowList[index].id)
      console.log(this.flowList[index].workname)
      console.log(this.flowList[index].category)
      console.log(this.flowList[index].capacity)
      this.$confirm('此操作将修改该工作流, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功！'
        })
        reques.post('/flow/update', {
          id: this.flowList[index].id,
          workname: this.flowList[index].workname,
          category: this.flowList[index].category,
          capacity: this.flowList[index].capacity
        }).then(res => {
          if (res.data.result) {
            res.data.data
          }
        })
      })
        .catch(
          () => {
            this.$message({
              type: 'info',
              message: '取消修改'
            })
          }
        )
    },
  },
  created() {
    this.flowAll();
  }
}
</script>

<style lang="less" scoped>
.flowHead {
  margin-bottom: 10px;
  height: 35px;
}

.flowBody {
  height: auto;
}
</style>