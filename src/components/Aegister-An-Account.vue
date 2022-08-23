<template>
  <el-container>
    <el-main>
      <div class="Wipass">
        <!-- 注册表单的盒子 -->
        <div class="qm_parcel">
          <div class="qm_mo">
            <span>已有账号？</span>
            <router-link to="/login">
              <el-link :underline="false" type="primary">去登陆</el-link>
            </router-link>
          </div>
          <!-- 内容部分 -->
          <el-form status-icon ref="ruleForm" label-width="100px" :model="ruleForm" hide-required-asterisk
            :rules="rules" class="demo-ruleForm">
            <h1>用户注册</h1>
            <el-form-item prop="workpass">
              <el-input v-model="ruleForm.workpass" prefix-icon="el-icon-user-solid" @blur="add_emil"
                autocomplete=" off" style="margin-top: 50px;" placeholder="请输入邮箱账号">
              </el-input>
            </el-form-item>
            <el-form-item prop="checkpass">
              <el-input type="password" show-password prefix-icon="el-icon-lock" v-model="ruleForm.checkpass"
                autocomplete="off" placeholder="用户密码">
              </el-input>
            </el-form-item>
            <el-form-item prop="checkPas">
              <el-input type="password" show-password v-model="ruleForm.checkPas" prefix-icon="el-icon-lock"
                autocomplete="off" placeholder="确认密码">
              </el-input>
            </el-form-item>
            <el-form-item prop="checkPass" :rules="[
              { required: true, message: '请输入用户名', trigger: 'blur' },
            ]">
              <el-input v-model="ruleForm.checkPass" autocomplete="off" prefix-icon="el-icon-user-solid"
                placeholder="用户名">
              </el-input>
            </el-form-item>
            <el-form-item style="margin-left: 12px;" class="potro" prop="auth">
              <el-image style="width: 200px" :src="src" @click="headimg"></el-image>
              <el-input v-model="ruleForm.auth" autocomplete="off" prefix-icon="el-icon-s-order"
                style="margin-left: 0px;" placeholder="输入四位验证码">
              </el-input>
            </el-form-item>
            <el-form-item class="qm_centen" style="margin-left: -50px;">
              <el-button type="primary" @click="addget('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </el-main>
  </el-container>

</template>

<script>
import reques from '@/utils/respone';
import { throttle } from '@/utils/throttle.js'
export default {
  name: "Aegister-An-Account",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error('请输入密码'));
      } else if (value != this.ruleForm.checkpass) {
        callback(new Error('2次密码不一致'))
      } else {
        callback()
      }
    };
    return {
      ruleForm: {
        // 邮箱验证
        checkPass: "",
        // 用户账号
        workpass: "",
        // 用户密码
        checkpass: '',
        // 确认密码
        checkPas: "",
        auth: "",
        name: ''
      },
      rules: {
        workpass: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        // 用户密码
        checkpass: [
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
        // 确认密码
        checkPas: [
          { validator: validatePass, trigger: 'blur' },
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
        auth: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            pattern: /[\w]+/,
            message: '不能是中文字符',
            trigger: 'blur'
          },
          {
            pattern: /^\S{4}$/,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
      },
      src: ''
    }
  },
  methods: {
    // 验证数据库是否有有这个用户名
    add_emil() {
      reques.get('/login/findusername/' + this.ruleForm.workpass).then(res => {
        if (res.data.result == true) {
          this.$alert('用户名已存在,请换一个用户邮箱', '提示', {
            confirmButtonText: '确定',
          });
          this.ruleForm.workpass = ""
        }
      })
    },
    // 使用节抖来防止数据的多次调用
    headimg: throttle(function () {
      this.gong()
    }),
    gong() {
      this.src = '/login/getVerifyCode?' + Math.random();
    },

    addget(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证码验证
          reques.get('/login/getVerIf/' + this.ruleForm.auth).then(res => {
            if (res.data.result == true) {
              // 将数据保存到数据库中
              reques.post('/login/register', {
                username: this.ruleForm.workpass,
                password: this.ruleForm.checkPas,
                name: this.ruleForm.checkPass,
              }).then(res => {
                this.$message({
                  // type是代表的颜色样式
                  type: 'success',
                  // 出现的文字
                  message: '注册成功'
                })
              })
              this.$router.push('/login')
            } else {
              this.$message('验证码错误')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.gong()
  }
}
</script>

<style lang="less" scoped>
@media screen and (max-width:1440px) {
  .el-container {
    width: 1440px;
  }
}

/deep/html,
body {
  width: 100%;
  height: 100%;
}

.el-container {
  height: 100%;
  background: url('../../public/desktop_8.jpg');
  background-size: cover;
}

// 最外层的盒子
.Wipass {
  display: flex;
  justify-content: center;
  align-items: center;

  /deep/ .el-input {
    margin-left: -50px;

    .el-input__suffix {
      right: -43px;
    }
  }

  .qm_centen {
    display: flex;
    justify-content: center;
  }

  .el-input {
    /deep/ .el-input__inner {
      width: 450px;
      border: 0px;
      border-bottom: 1px solid #dcdfe6;
    }
  }


  /deep/.potro {
    .el-form-item__content {
      display: flex;
      justify-content: center;

      .el-image {
        height: 41px;
      }

      .el-form-item__error {
        margin-left: 177px;
      }

      .el-input__suffix {
        right: 66px;

      }
    }

    .el-input__inner {
      width: 305px;
      border: 0px;
      border-bottom: 1px solid #dcdfe6;
    }
  }


  .el-input-group {
    width: 0px;
  }

  .qm_parcel {
    width: 1212px;
    height: 617px;
    background-color: aliceblue;
    opacity: 0.9;

    .qm_mo {
      display: flex;
      justify-content: flex-end;
      position: relative;
      top: 26px;
      right: 39px;
      left: -37px;

    }

    // 内容样式
    .demo-ruleForm {
      display: flex;
      flex-flow: column;
      align-items: center;

      h1 {
        font-size: 50px;
        background-clip: text;
        color: transparent;
        background-image: linear-gradient(120deg, #30cfd0 0%, #ebbba7 50%, #a3bded 80%);
      }
    }
  }

}
</style>