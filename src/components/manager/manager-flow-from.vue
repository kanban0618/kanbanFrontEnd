<template>
  <div>
    <el-button @click="dialogVisible = true" round type="primary">新建工作流</el-button>
    <el-dialog width="31.25rem" :visible.sync="dialogVisible" title="新建工作流">
      <el-form :model="flows" ref="flows">

        <el-form-item prop="workname">
          <div style="margin-bottom: 1.5rem">
            <el-tag size="small" style="margin-right: 0.5rem">工作流名称</el-tag>
            <el-input v-model="flows.workname" size="small" style="width: 18.75rem" placeholder="请输入工作流名称">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="category">
          <div style="margin-bottom: 1.5rem">
            <el-tag size="small" style="margin-right: 0.5rem">工作流类别</el-tag>
            <el-input v-model="flows.category" size="small" style="width: 18.75rem" placeholder="请输入工作流类别"></el-input>
          </div>
        </el-form-item>

        <el-form-item prop="capacity">
          <div style="margin-bottom: 1.5rem">
            <el-tag size="small" style="margin-right: 0.5rem">在制品限制</el-tag>
            <el-input-number v-model="flows.capacity" @change="handleChange" :min="1" :max="10" placeholder="输入在制品限制"
              size="small" style="width: 18.75rem"></el-input-number>
          </div>
        </el-form-item>
        <el-form-item prop="sort">
          <div style="margin-bottom: 1.5rem">
            <el-tag size="small" style="margin-right: 0.5rem">工作流排序</el-tag>
            <el-input v-model="flows.sort" size="small" style="width: 18.75rem" placeholder="请根据卡片的数量添加,避免造成不好的体验">
            </el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <div style="text-align: right">
            <el-button size="small" @click="quxaio" style="float:left;">取消</el-button>
            <el-button @click="submitForm('flows')" type="primary">新增</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import reques from "@/utils/respone";
export default {
  name: "manager-flow-from.vue",
  data() {
    return {
      dialogVisible: false,
      foto: false,
      flowList: [],
      flows: {
        id: 0,
        workname: '',
        category: '',
        capacity: '',
        sort: ''
      },
      flowswork: []
    }
  },
  methods: {
    // 工作流限制品的点击事件
    handleChange(value) {
      // console.log(value);
    },
    // 添加任务流
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          reques.post('/flow/save', {
            workname: this.flows.workname,
            category: this.flows.category,
            capacity: this.flows.capacity,
            sort: this.flows.sort
          }).then(res => {
            this.$emit('work', res.data.data)
          })
          this.$message({
            type: 'success',
            message: '添加成功'
          });
          this.$refs[formName].resetFields();
          this.dialogVisible = false;
        } else {
          this.$message({
            type: 'error',
            message: '添加失败'
          });
          return false;
        }
      });
    },
    quxaio() {
      (this.flowList.workname = ''),
        (this.flowList.category = ''),
        (this.flowList.capacity = '')
      this.dialogVisible = false
    },
  }
}
</script>
<style scoped>
</style>
