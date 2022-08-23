<template>
  <div class="zero">
    <el-card class="box-card" shadow="never">
      <div class="clearfix one" @click="flag = flag == true ? false : true">
        <span>{{ title.title }}</span>
        <el-popconfirm confirm-button-text='确定' cancel-button-text='不用了' icon="el-icon-info" icon-color="red"
          title="确定删除此卡片吗？" @confirm="add(title.id)">
          <el-button style="float: right; padding: 3px 0" class="two el-icon-close" slot="reference"></el-button>
        </el-popconfirm>
      </div>
      <el-collapse-transition>
        <div class="text" @click="updata" v-show="flag">
          <p>
            负责人：<span>{{ title.po }} {{ title.sponsor }}</span>
            <br>
          </p>
          <p>
            结束时间：<span>{{ dateFormat(title.actime) }}</span>
            <br>
          </p>
          <p>
            内容:<span>{{ title.content }}</span>
            <br>
          </p>

        </div>
      </el-collapse-transition>
    </el-card>
    <!-- 修改卡片的值 -->
    <div v-if="max">
      <ManagerUpdataCard :fh_editTask="title" @event="events"></ManagerUpdataCard>
    </div>
  </div>
</template>

<script>
import ManagerUpdataCard from './manager-updata.card.vue';
export default {
  // title 有值
  props: ["title", "time", "Arrty"],
  name: "manager-main-card",
  data() {
    return {
      max: false,
      Arrtys: this.Arrty,
      flag: false,

    }
  },
  methods: {
    // 子传父的值
    events(val) {
      this.max = val
    },
    dateFormat(str) {
      var dateee = new Date(str).toJSON();
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      return date;
    },
    // 点击改变得值
    updata() {
      this.max = true

    },
    add(val) {
      this.$emit("remove", val);
    },
    onconfirm() {
      this.visible = false;
      this.$emit("onconfirm");
    },
    oncancel() {
      this.visible = false;
      this.$emit("oncancel");
    }
  },
  components: { ManagerUpdataCard }
}

</script>

<style lang="less" scoped>
.one {
  font-weight: bold;
  text-align: center;
}

.two {
  width: 60px;
  background: #FAF9DE;
  transition: all 0.15s ease;
}

.el-button {
  border: 0px;
}

.text {
  font-size: 18px;
  line-height: 1em;
  text-align: left;
  font-family: 楷体;
  font-weight: bold;
}

p {
  line-height: 37px;
}



.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;


}

/deep/ .box-card {
  background-color: #FAF9DE;
  border-radius: 20px;
}
</style>