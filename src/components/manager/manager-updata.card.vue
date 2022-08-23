<template>
  <div>
    <el-dialog title="修改任务" :visible.sync="fh_editTaskState" width="30%" :before-close="handleClose" append-to-body>
      <el-form ref="form" modal label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="fh_editTask.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="fh_editTask.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="fh_editTask.po"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="fh_editTask.sponsor"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker type="datetime" v-model="fh_editTask.publishtime" style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计时间">
          <el-date-picker type="datetime" v-model="fh_editTask.ectime" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-date-picker type="datetime" v-model="fh_editTask.actime" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="所属故事">
          <el-input v-model="fh_editTask.storyid"></el-input>
        </el-form-item>
        <el-form-item label="估算点">
          <el-input v-model="fh_editTask.estimate"></el-input>
        </el-form-item>
        <el-form-item label="工作流ID">
          <el-input v-model="fh_editTask.flowid" readonly></el-input>
        </el-form-item>
        <el-form-item label="工作状态" prop="state">
          <el-radio-group v-model="fh_editTask.state">
            <el-radio label="未开始"></el-radio>
            <el-radio label="进行中"></el-radio>
            <el-radio label="已完成"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权重排序">
          <el-input v-model="fh_editTask.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"></span>
      <el-button type="primary" @click="upDataTask">保 存</el-button>
      <el-button @click="State">取 消</el-button>
    </el-dialog>
  </div>

</template>

<script>
import reques from '@/utils/respone';
export default {
  props: ['fh_editTask'],
  name: "manager-public-edit-task",
  data() {
    return {
      editTask: {

      },
      fh_editTaskState: true
    };
  },
  methods: {
    State() {
      this.$emit('event', this.fh_editTaskState = false);
    },
    // 提交修改任务
    upDataTask() {
      this.editTask = this.fh_editTask;
      delete this.editTask.flow;
      delete this.editTask.sponsorList;
      reques.post('/task/update', this.editTask).then(res => {
        if (res.data.result) {
          this.$message.success('保存成功!');
          this.$emit('event', this.fh_editTaskState = false);
        } else {
          this.$message.error('保存失败!');
        }
      })
    },
    // 获取任务信息
    async findByTaskId() {
      const { data: res } = await reques.get("/task/findById/" + this.fh_editTask.id);
      if (res.result === true)
        console.log((this.editTask = res.data));
    },
    handleClose(done) {
      this.$emit('event', this.fh_editTaskState = false);
    },
    hai() {
      this.fh_editTaskState = true;
    }
  },
}
</script>
<style scoped>
</style>