<template>
  <div class="board">
    <!-- tabSign拖拽类名 -->
    <div class="board example1">
      <div class="board-left " v-for="(value, i) in boxmaxList" :key="value.id">
        <el-card shadow="hover">
          <div class="center">
            <h1>{{ value.workname }} ({{ value.id }})</h1>
            <span class="el-dropdown-link" @click="delwork(value.id)"><i class="el-icon-close"
                style="margin-top: 0.4rem;"></i></span>
          </div>
        </el-card>
        <!-- 卡片内容处 -->
        <div v-if="boxmaxList && boxmaxList.length">
          <div ref="elem" class="eme">
            <draggable v-model="value.taskList" :scroll=true group="taskList" animation="100" @start="onStart"
              @end="onUpdate">
              <ManagerMainCard :title="flow" @remove="remove(i, $event)" v-for="flow in value.taskList" :key="flow.id">
              </ManagerMainCard>
            </draggable>
            <!-- 卡片组件 -->
          </div>
        </div>
        <!-- 新建得任务流卡片 -->
        <div>
          <ManagerAddTask @respones="add_task"></ManagerAddTask>
        </div>
      </div>
    </div>
    <!-- 新建工作流 -->
    <div class="qm_tom" style="min-width:200px">
      <ManagerFlowFrom @work="workflow"></ManagerFlowFrom>
    </div>
  </div>
</template>

<script>
import reques from '@/utils/respone'
//拖拽插件引入
import Sortable from 'sortablejs'
import draggable from 'vuedraggable'
// 兄弟传值
import enevrBus from '@/utils/eventBus.js'
import ManagerMainCard from './manager-main-card.vue'
import ManagerAddTask from './manager.add.task.vue'
import ManagerFlowFrom from './manager-flow-from.vue';
import eventBus from '@/utils/eventBus.js'
export default {
  name: "manager-main-flow",
  components: {
    ManagerMainCard,
    ManagerAddTask,
    draggable,
    ManagerFlowFrom
  },
  data() {
    return {
      // 接收的
      boxmaxList: [],
      flag: false,
      _List: [],
      List_one: [],
      index: 1
    }
  },

  methods: {
    // 拖拽工作流
    MoveAdd() {
      const example1 = document.querySelector(".example1"); //找到想要拖拽的那一列
      new Sortable(example1, {
        animation: 100,
        ghostClass: 'blue-background-class',
        sort: true,
        // 按住的是拖动的头部
        draggable: ".board-left",
        // 可以往上移动
        scroll: true,
        // 当拖拽更新后
        onEnd: (evt) => { // 监听拖动结束事件
          const currRow = this.boxmaxList.splice(evt.oldIndex, 1)[0]
          this.boxmaxList.splice(evt.newIndex, 0, currRow)
          // 使用循环将其每一个跟改后的值的id和sort的值全部传到数据库里面去，对数据库里面的工作流进行更新
          this.boxmaxList.forEach((item, index) => {
            reques.post('/flow/update', {
              id: item.id,
              sort: index + 1
            }).then(res => {
              // this.$message('')
            }).catch(erro => {
              console.log(erro);
            })
          });
        }
      })
    },
    // 上下拖动事件
    demoTest() {
      if (this.boxmaxList.length) {
        const el = this.$refs.elem
        el.forEach((item) => {
          new Sortable(item, {
            animation: 150,
            scroll: true,
            fallbackOnBody: true,
            ghostClass: 'blue-background-class',
          });

        })
      }
    },
    // 添加工作流(子传父过来的值)
    workflow(val) {
      this.boxmaxList.push(val)
    },
    // 删除工作流
    delwork(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        reques({
          type: 'get',
          url: '/flow/delete/' + val
        }).then(res => {
          this.boxmaxList = this.boxmaxList.filter(item => item.id != val)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //卡片拖拽的交互
    onUpdate() {
      this.drag = false;
      // 将数据全部全部取出后，再次获得数组里面的数组对象并且将其全部获取到
      this.boxmaxList.forEach((item) => {
        item.taskList.forEach(value => {
          // 将值进行对后端数据库的传递，获取的值
          reques.post('/task/update', {
            id: value.id,
            flowid: item.id,
            sort: item.id,
            // 估算时间
            estimate: Math.floor(Math.random() * 5 + this.index)
          }).then(res => {
          }).catch(erro => {
            this.$message('失败的移动')
          })
        })
      })
    },

    // /flow/findById/的参数获取
    async Port_calls() {
      // 调取获取的值
      const {
        data: restop
      } = await reques.get("/flow/all");
      // 判断是否能拿到数据,拿到数据后使用map来遍历数组获得他的id号
      if (restop.result == true) this._List = restop.data.map(item => {
        return item.id
      })
      // 使用循环发送每一个id号的请求
      // 使用promise来解决这个异步问题
      // 新建一个数组,接受到数据后使用prmise来解决回调地狱的问题
      let arr = []
      for (let index = 0; index < this._List.length; index++) {
        const {
          data: resbom
        } = await reques.get("/flow/findById/" + this._List[index]);
        // 将数据获取到的存在arr数组里面
        arr[index] = resbom.data
      }
      // 返回给这个方法进行数据的promise
      return Promise.resolve(arr)
    },
    // 从子组件返回过来的id值，使用将其删掉
    remove(ele, val) {
      reques({
        type: 'get',
        url: '/task/delete/' + val
      }).then(res => {
        this.boxmaxList[ele].taskList = this.boxmaxList[ele].taskList.filter(item => item.id != val)
      })
    },
    //获取到子传过来的值
    add_task(val) {
      // 将对象里的控制的属性id给解构出来
      const {
        flowid
      } = val
      //传入的flowid来确定加入到那个对象下面的数组里
      this.boxmaxList[flowid - 1].taskList.push(val)
      console.log(this.index = time)
    }
  },
  mounted() {
    this.MoveAdd()
    // 使用promise返回出来的一个数组，然后再将其进行赋值的操作
    this.Port_calls().then(res => {
      this.boxmaxList = res
      this.$nextTick(() => {
        this.demoTest()
        // 兄弟组件task-flow传过来的值
        eventBus.$on('work', val => {
          // 增加指定的位置
          // this.$set(this._data.boxmaxList, val.sort, val)
          this.boxmaxList.push(val)
        })
      })
    })

  },
}
</script>

<style lang="less" scoped>
.board {
  width: 100%;
  display: flex;
  cursor: pointer;
  user-select: none;

  /deep/.el-card {
    .el-card__body {
      min-width: 261px;
    }
  }

  .opo {
    height: 1000px;
    border: 1px solid;
  }

  .board-left {
    border-right: 0.0625rem solid #e7e7e7;
    flex: 1;
    height: 100%;

    .center {
      display: flex;
      justify-content: space-between;

      span {
        transition: all 0.3s;
      }

      span:hover {
        transform: rotate(180deg);
        transform: scale(1.5);
      }
    }
  }

  .qm_tom {
    margin-top: 15px;
  }


}
</style>
