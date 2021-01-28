<template>
  <div class="login_container">
    <div class="login_box" >
    <div class="left"><img class="left_image" src="../assets/images/imhere1.jpg" /></div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="20px"
        class="login_form"
      >
        <h1 class="tittle">{{tittle}}</h1>
        <!-- 用户名 -->
        <el-form-item prop="username" label=" ">
          <el-input             border="none"
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user" placeholder="用户名 | Username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label=" ">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima" placeholder="密码 | Password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item v-show="loginflag" v-bind:style="{height:height + 'px'}" prop="password" label=" ">
          <el-input
            v-model="authpassword"
            prefix-icon="iconfont icon-3702mima"
            placeholder="确认密码 | AuthPassword"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 手机 -->
        <!-- <el-form-item v-show="loginflag" class="mobile" v-bind:style="{display:display}" prop="mobile" label=" ">
          <el-input
            v-model="loginForm.mobile"
            prefix-icon="iconfont icon-3702mima"
            placeholder="手机 | Mobile"
          ></el-input>
        </el-form-item> -->
        <!-- 邮箱 -->
        <!-- <el-form-item v-show="loginflag" class="email" v-bind:style="{height:height + 'px'}" prop="email" label=" ">
          <el-input
            v-model="loginForm.email"
            prefix-icon="iconfont icon-3702mima"
            placeholder="邮箱 | Emeil"
          ></el-input>
        </el-form-item> -->
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-row>
            <el-button class="btn" type="primary" @click="login" v-noMoreClick
              >登录</el-button
            >
            <el-button class="btn" type="primary" @click="register"
              >立即注册</el-button
            >
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="bg-bubbles">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的校验规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (value) {
        if (regEmail.test(value)) {
          // 合法的邮箱
          return cb()
        } else {
          cb(new Error('请输入合法的邮箱'))
        }
      } else {
        return cb()
      }
    }
    // 验证手机的校验规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (value) {
        if (regMobile.test(value)) {
          // 合法的邮箱
          return cb()
        } else {
          cb(new Error('请输入合法的手机号'))
        }
      } else {
        return cb()
      }
    }
    return {
      loginflag: false,
      tittle: '欢迎登录IMHere',
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      // 再次输入密码，确认密码
      authpassword: '',
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击注册显示注册表单
    changestatus() {
    },
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      if (this.loginflag) {
        this.loginflag = !this.loginflag
        this.tittle = '欢迎登录IMHere'
        return
      }
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('/login', this.loginForm)
        console.log(res)
        if (res.model.errno === 0) this.$message.success('登陆成功')
        if (res.model.errno !== 0) this.$message.error('登陆失败')

        // 1、将登录成功之后的 token 保存到客户端的 sessionStorage中
        // 1.1 项目中除了登录之外的其他api接口，必须在登录之后才能访问
        // 1.1 token之在当前网站打开期间生效，所以将 token 保存在 sessionStorage中
        window.sessionStorage.setItem('token', res.token)
        // 2、通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    },
    register() {
      if (!this.loginflag) {
        this.loginflag = !this.loginflag
        this.tittle = '欢迎注册IMHere'
        return
      }
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) {
          return
        }
        if (this.loginForm.password !== this.authpassword) {
          this.$message.error('两次输入的密码不一样，请确认密码')
          this.authpassword = ''
          console.log(123)
          return
        }
        const { data: res } = await this.$http.post(
          '/register',
          this.loginForm
        )
        if (res.model.errno === 0) this.$message.success('注册成功')
        if (res.model.errno !== 0) this.$message.error('注册失败')

        // 2、通过编程式导航跳转到后台主页，路由地址是 /home
        // this.$router.push('/home')
        this.loginflag = !this.loginflag
        this.login()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
