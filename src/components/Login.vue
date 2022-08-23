<template>
  <el-container>
    <el-main>
      <div class="tspo">
        <div class="mont">
          <div class="crt">
            <p>Welcome</p>
            <div>看板系统登录界面</div>
          </div>
        </div>
        <el-form ref="form" label-width="65px" class="rotp">
          <div style="margin-top: 100px">
            <el-form-item>
              <el-input prefix-icon="el-icon-user-solid " v-model.trim="text" placeholder="请输入账号" clearable
                @keyup.enter.native="keyupTest"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-lock" v-model.trim="password" show-password placeholder="请输入密码" clearable
                @keyup.enter.native="keyupTest"></el-input>
            </el-form-item>

            <div class="top_lis">
              <el-checkbox v-model.trim="checked" @change="stockpile">记住密码</el-checkbox>
              <router-link to="/forget">
                <el-link :underline="false">忘记密码</el-link>
              </router-link>
            </div>
            <el-form-item style="margin-left: 50px">
              <el-button type="primary" @click="skip">登录</el-button>
            </el-form-item>
            <div class="qm_aegi">
              <span>没有账号？</span>
              <router-link to="/aegisteranaccount">
                <el-link :underline="false" type="primary">注册账号</el-link>
              </router-link>
            </div>
          </div>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import reques from '@/utils/respone.js'
export default {
  name: 'Login',
  data() {
    return {
      text: '',
      password: '',
      verification: '',
      checked: false,
      checkeds: ''
    }
  },
  methods: {
    // 页面刷新自动获取数据并且进行渲染
    addstore() {
      // 获取到本地数据的值
      let username = localStorage.getItem("username")
      let passworde = localStorage.getItem("password")
      let checkedse = localStorage.getItem("checked")
      if (username || passworde || checkedse) {
        this.text = username
        this.password = passworde
        this.checked = true
      }
    },
    // 储存账号密码在本地
    stockpile() {
      if (this.checked) {
        // localStorage.setItem(this.text, this.password);
        localStorage.setItem("username", this.text)
        localStorage.setItem("password", this.password)
        localStorage.setItem("checked", true)
      } else {
        // 如果忘记密码为假，那就清除所有数据
        localStorage.clear()
      }
    },

    // 用户表数据调用
    skip() {
      if (this.password == '' || this.text == '') {
        this.$message.error('账号密码不能为空')
        return
      }
      reques
        .post('/login/doLogin', {
          username: this.text,
          password: this.password
        })
        .then(res => {
          if (res.data.result == true) {
            // 存放一个tonken
            localStorage.setItem('token', 'Bear xxxx')
            // console.log(res.data)
            // 根据router文件的index.js里面的注册的path地址的注册明跳转
            this.$router.replace('./manager')
            // this.$router.replace('./board')

          } else {
            this.$message.error('账号密码错误')
          }
        })
        .catch(error => {
          this.$message.error('数据错误')
        })
    },
    // 回车事件
    keyupTest() {
      this.skip()
    }
  },
  created() {
    this.addstore()
  },
}
</script>

<style lang="less" scoped>
@media screen and (max-width:1440px) {
  .el-container {
    width: 1440px;
  }
}

.el-container {
  height: 100%;
  background-image: url('/public/desktop_4.jpg');
  background-size: 100% 100%;
}

.el-checkbox {
  margin-left: 35px;
}

.el-main {
  display: flex;
  justify-content: center;
  overflow: none;
  height: 100%;

  .tspo {
    display: flex;
    justify-content: center;
    align-items: center;

    .rotp {
      width: 430px;
      height: 480px;
      background: white;

      // 注册账号效果
      .qm_aegi {
        display: flex;
        justify-content: center;
      }

      .inp {
        width: 60%;
      }

      .miten {
        margin-left: -50px;
      }

      .el-input {
        left: -50px;

        /deep/ .el-input__inner {
          border: 0px;
          border-bottom: 1px solid #dcdfe6;
        }
      }
    }

    .top_lis {
      display: flex;
      justify-content: space-between;

      :nth-child(2) {
        margin-right: 50px;
      }
    }

    .mont {
      width: 430px;
      height: 480px;
      border-radius: 4px;
      background-color: rgba(255, 255, 248, 0.5);
      text-align: center;

      .crt {
        margin-top: 73px;
      }

      :nth-child(1) {
        font-size: 40px;
        background-clip: text;
        color: transparent;
        background-image: linear-gradient(120deg, #30cfd0 0%, #ebbba7 50%, #a3bded 80%);
      }

      :nth-child(2) {
        font-size: 50px;
        background-clip: text;
        color: transparent;
        background-image: linear-gradient(-90deg, #29be0e 0%, #276ace 100%);
      }
    }
  }
}

.el-button--primary {
  width: 200px;
  border-radius: 30px;
  background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
}

h1 {
  font-size: 50px;
  text-align: center;
}

.el-card__body {
  margin-top: 25px;
}

.el-form-item {
  margin-top: 50px;
}
</style>
