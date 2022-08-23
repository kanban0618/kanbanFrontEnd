<template>
  <div>
    <!--    头部-->
    <div class="roleHead">
      <el-tooltip content="用户id/网址/状态<true/false>" placement="bottom" effect="light">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="state" style="float: left;width: 200px">
        </el-input>
      </el-tooltip>

      <el-button @click="fuzzyQuery" style="float: left;margin-left: 10px">查找</el-button>
      <el-button @click="addDialog" style="float: left;margin-left: 10px">新建规则</el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="float: left;margin-left: 10px;margin-top: 13px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>功能区</el-breadcrumb-item>
        <el-breadcrumb-item>规则管理</el-breadcrumb-item>
        <!--        <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
    </div>
    <!--    面板-->
    <div class="roleBody">
      <!-- 这里自己写一个吧 -->
      <el-empty description="这里什么都没有" v-show="!tableDataVisible"></el-empty>
      <el-table v-show="tableDataVisible" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="id" fixed width="60">
        </el-table-column>
        <el-table-column prop="userid" label="用户id">
        </el-table-column>
        <el-table-column prop="url" label="网址">
        </el-table-column>
        <el-table-column prop="token" label="状态" :formatter="formatBoolean">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.token" active-color="#5B7BFA" inactive-color="#dadde5">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <!--            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
            <!--            <el-button @click="upDialog(scope.row)" type="text" size="small">编辑</el-button>-->
            <el-button @click="upDialog(scope.row)" type="primary" icon="el-icon-edit" circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="title" :visible.sync="addRuleDialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="addRule" label-width="80px">
        <el-form-item label="用户id">
          <el-input v-model="addRule.userid"></el-input>
        </el-form-item>
        <el-form-item label="网络地址">
          <el-input v-model="addRule.url"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="addRule.token"></el-switch>
        </el-form-item>
      </el-form>
      <el-button @click="addRuleDialogVisible = false">取 消</el-button>
      <el-button type="success" @click="save" v-if="dialogState">确 定</el-button>
      <el-button type="primary" @click="update" v-if="!dialogState">保 存</el-button>
      <el-button type="danger" @click="delrule" v-if="!dialogState">删 除</el-button>
    </el-dialog>

  </div>
</template>

<script>
import reques from '@/utils/respone';

export default {
  name: "manager-main-role",
  data() {
    return {
      //表格数据
      tableData: [],
      //表单标题
      title: '',
      state: '',
      //临时对象
      addRule: {
        id: 0,
        userid: '',
        url: '',
        token: false
      },
      dialogState: false,
      //查询表格的返回结果
      tableDataVisible: true,
      addRuleDialogVisible: false
    }
  },
  methods: {
    //查询所有规则
    async ruleAll() {
      const { data: res } = await reques.get("/rule/all");
      if (res.result === true) {
        this.tableData = res.data;
        this.tableDataVisible = true;
        // console.log(this.tableData);
      }
    },
    //表单查看按钮
    handleClick(row) {
      // console.log(row);
    },
    //添加弹窗按钮
    addDialog() {
      this.addRule = {};
      this.title = '新建规则';
      this.dialogState = true;
      this.addRuleDialogVisible = true
    },
    //修改弹窗按钮
    upDialog(rule) {
      this.addRule = rule;
      this.title = '修改规则';
      this.dialogState = false;
      this.addRuleDialogVisible = true
    },
    //添加规则
    async save() {
      reques.post('/rule/save', this.addRule).then(res => {
        if (res.data.result) {
          this.$message.success('新建成功!');
          this.tableData.push(res.data.data);
          // console.log(res.data);
          this.addRuleDialogVisible = false;
        } else {
          this.$message.error('新建失败!');
        }
      })
    },

    //修改规则
    async update() {
      reques.post('/rule/update', this.addRule).then(res => {
        if (res.data.result) {
          this.$message.success('修改成功!');
          this.ruleAll();
          this.addRuleDialogVisible = false;
        } else {
          this.$message.error('修改失败!');
        }
      })
    },

    //删除规则
    async delrule() {
      const { data: res } = await reques.get("/rule/delete/" + this.addRule.id);
      if (res.result) {
        this.$message.success('删除成功!');
        await this.ruleAll();
        this.addRuleDialogVisible = false;
      } else {
        this.$message.error('删除失败!');
      }
    },

    //查找
    async fuzzyQuery() {
      if (this.state.length < 1) {
        await this.ruleAll();
      } else {
        reques({
          method: "POST",
          url: '/rule/fuzzyQuery',
          headers: {
            "Content-Type": "application/json"
          },
          data: this.state
        }).then(response => {
          // console.log(response);
          if (response.data.result === true) {
            this.tableDataVisible = true;
            console.log((this.tableData = response.data.data));
          } else {
            this.tableDataVisible = false;
          }
        })
      }
    },
    // 格式化
    formatBoolean: function (row, column, cellValue) {
      let ret;  //你想在页面展示的值
      if (cellValue) {
        ret = "开启"  //根据自己的需求设定
      } else {
        ret = "关闭"
      }
      return ret;
    },
    //关闭弹窗提示
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },

  },
  //自启动
  created() {
    this.ruleAll()
  }
}
</script>

<style scoped>
.roleHead {
  margin-bottom: 10px;
  /*border: 1px solid red;*/
  height: 35px;
}

.roleBody {
  /*border: 1px solid red;*/
  height: auto;
}
</style>