<template>
  <section class="loginPage">
    <el-form :model="loginForm" ref="loginForm" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_login">立即登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/reg">没有帐号?立即注册</router-link>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import user from '@/api/user'
export default {
  data(){
    return {
      loginForm:{
        name:"",
        password:""
      }
    }
  },
  methods:{
    _login(){
      user._login(this.loginForm).then(res=>{
        if(res.errcode==0){
          localStorage.setItem("userInfo",JSON.stringify(res.data));
          this.$router.push("/home")
        }else{
          this.$message({
            message:res.errmsg,
            type:"error"
          })
        }
      })
    },
    resetForm(){
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loginPage
    padding 40px 50px
    width 300px
</style>
