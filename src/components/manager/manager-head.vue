<template>
  <el-row>
    <div class="head">
      <div class="fh-head-left-diy">
        <el-col :span="10">
          <el-button type="text"><img src="../../assets/kanbanlogo.png" style="margin: -10px 10px" alt="">看板系统
          </el-button>
          <el-divider direction="vertical" class="el-divider--vertical"></el-divider>
        </el-col>
        <!--        <el-col :span="14">-->
        <!--          <el-input v-model="input" placeholder=" 请输入内容" class="myClass" clearable>-->
        <!--            <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
        <!--          </el-input>-->
        <!--        </el-col>-->
      </div>
      <div class="fh-head-right-diy">
        <!--        <el-button @click="userInfoState = !userInfoState" class="fh-rightMargin" round>看板</el-button>-->
        <el-button class="fh-rightMargin" round>看板</el-button>

        <el-tooltip content="新建工作流" placement="bottom" effect="light" class="fh-rightMargin">
          <el-dropdown trigger="click">
            <!-- 在 <el-dropdown></el-dropdown>标签下一定要加一个子组件<el-dropdown-menu></el-dropdown-menu>，不然会报错-->
            <el-dropdown-menu></el-dropdown-menu>
            <manager-add-from></manager-add-from>
            <!--            <el-button type="primary" icon="el-icon-plus"circle></el-button>-->
            <!--            <span class="el-dropdown-link">-->
            <!--              <el-button type="primary" icon="el-icon-plus" circle></el-button>-->
            <!--            </span>-->
            <!--            <el-dropdown-menu slot="dropdown" style="width: 150px">-->
            <!--              <el-dropdown-item icon="el-icon-plus" @click.native="dialogContoller.visible = true">新建工作流-->
            <!--              </el-dropdown-item>-->
            <!--              <el-dropdown-item icon="el-icon-circle-plus">暂定</el-dropdown-item>-->
            <!--              <el-dropdown-item icon="el-icon-circle-plus-outline">新建看板</el-dropdown-item>-->
            <!--              <el-dropdown-item icon="el-icon-check">新建看板</el-dropdown-item>-->
            <!--              <el-dropdown-item icon="el-icon-circle-check">新建看板</el-dropdown-item>-->
            <!--            </el-dropdown-menu>-->
          </el-dropdown>
        </el-tooltip>
        <el-tooltip content="消息" placement="bottom" effect="light" class="fh-rightMargin">
          <el-button type="info" icon="el-icon-bell" circle></el-button>
        </el-tooltip>
        <el-tooltip content="帮助" placement="bottom" effect="light">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-button type="warning" icon="el-icon-question" circle></el-button>
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 150px">
              <el-dropdown-item icon="el-icon-coin">
                <el-link href="http://localhost:8080/swagger-ui/index.html" target="_blank">后端Api</el-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">
                <el-link href="http://localhost:8081/" target="_blank">前端首页</el-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">
                <el-link href="http://localhost:8080/" target="_blank">后端首页</el-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-platform">
                <el-link href="https://docs.qq.com/desktop/mydoc/folder/MmjehFeGsXgE?u=2d50cf8b883d42af8b35c3146b67cee0"
                  target="_blank">协同办公
                </el-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-management">
                <el-link href="https://docs.qq.com/sheet/DTXp4aGpUdmNUTm9r?tab=0znogg" target="_blank">工作表文档</el-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-turn-off">
                <el-link href="https://e.coding.net/kanban/kanban/kanbanFrontEnd.git" target="_blank">前端Git</el-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-open">
                <el-link href="https://e.coding.net/kanban/kanban/kanban.git" target="_blank">后端Git</el-link>
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>

        </el-tooltip>
        <el-popover placement="bottom" title="" trigger="click" class="userInfo-el-popover">

          <div style="margin: 0;height: 70px">
            <div style="width: 60px;float: left;margin-right:10px">
              <el-upload class="avatar-uploader fh-border-radius" :action=action :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl || user.headimg.length > 1" :src="user.headimg" class="avatar fh-border-radius">
                <i v-else class="el-icon-plus avatar-uploader-icon fh-border-radius"></i>
              </el-upload>
            </div>
            <div style="float: left;margin-top: 10px">
              <h3>欢迎您!{{ user.name }}</h3>
              <p>看板id: 114514</p>
            </div>
          </div>

          <div class="fh-head-userInfo">
            <div style="height:30px">设置</div>
            <el-divider></el-divider>
            <div style="height: 200px">
              <p>工号: {{ user.jobno }}</p>
              <p>职位: {{ user.position }}</p>
            </div>
            <el-divider style="margin-bottom: 5px"></el-divider>
            <div style="height: 10px">
              <div style="margin: 0 auto;width: 80px">
                <el-link icon="el-icon-s-promotion" type="info" @click="logout">退出登陆
                </el-link>
              </div>
            </div>
          </div>

          <div slot="reference" style="float:right;margin-left: -10px">

            <el-tooltip content="用户信息" placement="bottom" effect="light">
              <el-avatar class="el-avatar-head" :src="user.headimg" :fit="fit" @error="errorHandler">
                {{ user.name }}
              </el-avatar>
            </el-tooltip>

          </div>

        </el-popover>

        <transition name="el-zoom-in-top">
          <div v-show="userInfoState">测试</div>
        </transition>
      </div>
    </div>
  </el-row>

</template>

<script>
import reques from '@/utils/respone'
import ManagerAddFrom from './manager-add-from.vue';
export default {
  props: ['username'],
  name: "manager-head",
  components: { ManagerAddFrom },
  data() {
    return {
      input: '',//搜索框输入
      imageUrl: '',//用户头像的路径
      fit: "fill",//用户头像的内容填充样式
      userInfoState: false,//用户界面的状态
      dialogContoller: {
        visible: false
      },//控制添加工作流隐藏或显示
      myHeaders: { Authorization: localStorage.getItem('_UTK') }, //获取Token
      action: "http://localhost:8081/" + 'user/upload',
      user: {//用户的暂存
        id: 0,
        name: '',
        username: '',
        password: '',
        jobno: '',
        position: '',
        headimg: ''
      }
    }
  },
  methods: {
    //注销方法
    logout: async function () {
      await reques.get("/login/logout");
      this.$router.push('Login');
      // 将本地存储全部清空
      localStorage.clear()
    },
    //获取用户信息
    async currentUser() {
      const { data: res } = await reques.get("/user/currentUser");
      if (res.result === true) {
        this.user = res.data
        // console.log(this.user)
      }
    },
    //上传用户头像start
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.currentUser();
    },
    beforeAvatarUpload(file) {
      const isIMG = file.type === 'image/png' || 'image/jpg' || 'image/jpeg';
      const isLt100M = file.size / 1024 / 1024 < 100;

      if (!isIMG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/JPEG 格式!');
      }
      if (!isLt100M) {
        this.$message.error('上传头像图片大小不能超过 100MB!');
      }
      return isIMG && isLt100M;
    }
    //上传用户头像end
    ,
    //用户头像加载失败显示用户姓名
    errorHandler() {
      return true
    }
  },
  //自启动
  created() {
    this.currentUser();
  },

}
</script>

<style scoped>
/*用户信息盒子*/
.fh-head-userInfo {
  width: 200px;
  height: 300px;
}

.fh-head-userInfo>div {
  /*border: 1px solid firebrick;*/
  margin-top: 10px;
}

.fh-head-userInfo>>>.el-divider--horizontal {
  margin: 5px auto;
}

/*右边组件边距*/
.fh-rightMargin {
  margin-right: 10px;
}

/*搜索栏圆角*/
.myClass>>>.el-input__inner {
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/*设置头像位置*/
.el-avatar-head {
  float: right;
  user-select: none;
  background: #909399;
}

/*设置头像颜色*/
.el-avatar-head:hover {
  cursor: pointer;
  background: #C0C4CC;
}

/*设置头像样式*/
.el-avatar-head /deep/ img {
  width: 100%;

}


/*上传头像*/
.avatar-uploader .el-upload {
  border: 1px solid sandybrown;
  /*border-radius: 30px;*/
  cursor: pointer;
  position: relative;
  overflow: hidden;
  object-fit: contain;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

/*上传前选中框的样式*/
.avatar-uploader-icon {
  border: 1px solid sandybrown;
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin: 10px 10px 10px 10px;
  text-align: center;
}

/*上传后的图片样式*/
.avatar {
  margin: 10px 10px 10px 10px;
  width: 50px;
  height: 50px;
  display: block;
}

/*导航栏右边*/
.fh-head-right-diy {
  width: 300px;
  margin: 10px 10px 10px 10px;
  float: right;
  white-space: nowrap;
}

/*导航栏左边*/
.fh-head-left-diy {
  width: 400px;
  float: left;
  margin: 10px 10px 10px 10px;
  position: absolute;
  white-space: nowrap;
}

/*边框圆角*/
.fh-border-radius {
  border-radius: 30px;
}
</style>