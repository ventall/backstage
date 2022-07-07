<template>
  <div class='login'>
    <vue-particles class="login-bg"
                   color="#dedede"
                   :particleOpacity="0.7"
                   :particlesNumber="80"
                   shapeType="circle"
                   :particleSize="4"
                   linesColor="#dedede"
                   :linesWidth="1"
                   :lineLinked="true"
                   :lineOpacity="0.4"
                   :linesDistance="150"
                   :moveSpeed="3"
                   :hoverEffect="true"
                   hoverMode="grab"
                   :clickEffect="false">
    </vue-particles>
    <div class="loginForm">
      <h3>Background management system</h3>
      <el-form :model="loginForm"
               ref="loginForm"
               :rules="loginRule"
               label-position="left">
        <el-form-item prop="username">
          <el-input placeholder="请输入管理员账号"
                    prefix-icon="el-icon-user"
                    v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入管理员密码"
                    prefix-icon="el-icon-lock"
                    show-password
                    v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="loginBtn"
                 @click="loginBtn">登录</el-button>
    </div>

  </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  components: {

  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRule: {
        username: [
          { required: true, message: '请输入账号名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账号密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  computed: {

  },
  watch: {

  },
  methods: {
    loginBtn () {
      this.$refs['loginForm'].validate(async (valid) => {
        if (valid) {
          try {
            let result = await this.login(this.loginForm)
            if (!result) {
              this.loginForm.password = ''
            }
          } catch (error) {
            console.log(error);
          }

        } else {
          return false;
        }
      });
    },
    resetForm () {
      this.$refs['loginForm'].resetFields();
    },
    ...mapActions(['login'])
  },
}
</script>
<style lang='stylus'>
.login
  display flex
  position relative
  justify-content center
  align-items center
  width 100%
  height 100%
  background url('../../assets/bg.webp') no-repeat
  background-size 100% 100%
  text-align center
  .login-bg
    position absolute
    left 0
    top 0
    width 100%
    height 100%
  .loginForm
    width 20%
    padding 30px
    h3
      color #ecf3ff
    .loginBtn:hover
      background rgba(255, 255, 255, 0.4)
    .loginBtn
      position relative
      width 100%
      margin-top 50px
      background rgba(255, 255, 255, 0.1)
      border-radius 10px
      border-color #4575e7
      color #262626
    .el-form
      padding 0 10px
      border 1px solid #4575e7
      border-radius 10px
      .el-form-item
        padding-top 20px
        .el-input
          .el-input__icon
            color #262626
      .el-form-item:last-child
        border-top 1px solid #4575e7
      .el-input__inner
        border 0
        background rgba(255, 255, 255, 0)
      .el-input__inner:focus
        background rgba(255, 255, 255, 0.4)
      .el-input__inner::-webkit-input-placeholder
        color #262626
</style>