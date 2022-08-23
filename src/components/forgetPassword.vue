<template>
  <div>
    <div class="box-connertai">
      <el-container class="box-com">
        <el-header>
          <el-steps :active="active" simple>
            <el-step title="输入邮箱" icon="el-icon-edit" />
            <el-step title="修改密码" icon="el-icon-upload" />
            <el-step title="完成" icon="el-icon-check" />
          </el-steps>
        </el-header>
        <el-main>
          <el-card class="box-card" v-show="active >= 3 ? false : true">
            <div slot="header" class="clearfix">
              <span>修改密码</span>

            </div>
            <div v-if="active == 1" class="topuo">
              <el-form ref="form" status-icon hide-required-asterisk :model="dynamicValidateForm" label-width="130px"
                label-position="20px" class="rotp">
                <el-form-item prop="email" class="aslep" :rules="[
                  { required: true, message: '请输入用户账号', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的用户账号', trigger: 'blur' }
                ]" label="输入邮箱">
                  <el-input v-model="dynamicValidateForm.email" placeholder="请输入用户账号" @change="pandua"></el-input>
                </el-form-item>
                <el-form-item prop="yzm" class="aslep" :rules="[
                  { required: true, message: '请输入正确的验证码', trigger: 'blur' },
                ]">
                  <el-button @click="tocode" :disabled="disabled">{{ toCode }}</el-button>
                  <el-input type="text" v-model="dynamicValidateForm.yzm" placeholder="输入验证码"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="active == 2">
              <el-form ref="form" status-icon hide-required-asterisk :validate-on-rule-change="false" :model="User"
                label-width="80px" :rules="formRules">
                <el-form-item label="新的密码" prop="username">
                  <el-input v-model="User.username" show-password placeholder="请输入最低6位数密码"></el-input>
                </el-form-item>
                <el-form-item label="确定密码" prop="password">
                  <el-input v-model="User.password" show-password placeholder="请确定密码"></el-input>
                </el-form-item>
              </el-form>
            </div>

            <div class="poro" v-show="active >= 3 ? false : true">
              <el-button @click="next">下一步</el-button>
            </div>
          </el-card>
          <div v-show="active == 3">
            <el-row>
              <el-col :sm="24" :lg="24">
                <el-result icon="success" title="修改密码成功" subTitle="点击返回登录页面">
                  <template slot="extra">
                    <el-button type="primary" size="medium" @click="black">返回</el-button>
                  </template>
                </el-result>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </div>

  </div>
</template>

<script>
import reques from '@/utils/respone'
export default {
  name: 'forgetPassword',
  data() {
    // 对密码的两次效验
    var ckeckped = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error('密码不能为空'))
      } else if (value != this.User.username) {
        callback(new Error('2次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      dynamicValidateForm: {
        email: '',
        emilt: '',
        yzm: ''
      },
      //密码更改
      User: {
        username: '',
        password: ''
      },
      //绑定formRules表单验证
      formRules: {
        username: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /[\w]+/,
            message: '不能是中文字符',
            trigger: 'blur'
          },
          {
            pattern: /^\S{6,}$/,
            message: '不能是少于六位数',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true, trigger: 'blur', message: '请输入密码'
          },
          { validator: ckeckped, trigger: 'blur' },
          {
            pattern: /[\w]+/,
            message: '不能是中文字符',
            trigger: 'blur'
          },
        ],
      },
      active: 1,
      name: '',
      disabled: false,
      minin: 60,
      toCode: '点击获取验证码',
      id: '',
      position: "",
      headimg: ""
    }
  },
  methods: {
    pandua() {
      this.disabled = true
      reques.get('/login/findusername/' + this.dynamicValidateForm.email).then(res => {
        if (res.data.result == false) {
          this.$confirm('用户未存在,请先注册', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            closeOnClickModal: false,
            type: 'warning'
          }).then(() => {
            this.$router.push('/login')
          }).catch(() => {
            this.$router.push('/login')
          });
        }
      })
    },
    nom() {
      this.$router.push('/login')
    },
    next() {
      this.$refs['form'].validate(valid => {
        // 如果为true那就进行跳转
        if (valid) {
          // 如果为true那就进行跳转
          if (valid) {
            if (this.active == 1) {
              reques.get('/login/emilyxyzm/' + this.dynamicValidateForm.yzm).then(res => {
                // 判断是否为真
                if (res.data.data == true) {
                  this.active = 2
                } else {
                  this.active = 1
                  this.$confirm('验证码错误')
                }
              })
              return
            }
            if (this.active == 2) {
              reques.get('/user/findUserName/' + this.dynamicValidateForm.email).then(res => {
                this.id = res.data.data.id
                this.position = res.data.data.position
                this.headimg = res.data.data.headimg
                if (res.data.result == true) {
                  reques.post('/user/update', {
                    headimg: this.headimg,
                    position: this.position,
                    name: res.data.data.name,
                    id: this.id,
                    username: this.dynamicValidateForm.email,
                    password: this.User.username
                  }).then(res => {
                  }).catch(res => {
                    this.$confirm('修改错误')
                  })
                }
              })
            }
            if (this.active++ >= 3) this.active = 3
          } else {
            console.log('error submit!!')
            return false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    tocode() {
      if (this.dynamicValidateForm.email == "") {
        this.$alert('用户账号不能为空', '提示', {
          confirmButtonText: '确定',
        });
        this.toCode = `点击获取验证码`
      } else {
        this.disabled = true
        let timers = setInterval(() => {
          this.minin--
          if (this.minin <= 0) {
            clearInterval(timers)
            // 禁用点击框
            this.disabled = false
            // 改变值
            this.toCode = `点击获取验证码`
            this.minin = 60
            return
          }
          this.toCode = `${this.minin}秒后重新发送`
        }, 1000)
        reques.get('/login/emilMail/' + this.dynamicValidateForm.email).then(res => { })
      }
    },
    black() {
      // 返回页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/html,
body {
  width: 100%;
  height: 100%;
}

.el-container {
  flex-direction: column;

  /deep/.el-form-item {
    .el-form-item__content {
      margin-left: -11px !important;

      .el-form-item__error {
        left: 96px;
      }
    }
  }

  .el-main {
    display: flex;
    justify-content: center;

    .rotp {
      display: flex;
      flex-flow: column;
      justify-content: center;

      /deep/.aslep {
        .el-form-item__content {
          .el-form-item__error {
            left: 144px;
          }
        }
      }
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }


  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    min-width: 480px;
  }

  .box-card {
    // margin-left: 500px;
    min-width: 500px;
    height: 250px;
    display: flex;
    flex-flow: column;
  }
}

.box-com {
  width: 100%;
  height: 100%;

  /deep/ .el-form-item__label {
    padding: 0 7px 0 0;
  }

  .poro {
    display: flex;
    justify-content: center;
  }

  .el-input {
    width: 60%;
  }
}
</style>
