<template>
  <section class="regPage">
    <el-form :model="regForm" label-width="80px" ref="regForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="regForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="regForm.password"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="regForm.sex" placeholder="性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="regForm.age"></el-input>
      </el-form-item>
      <el-form-item label="格言" prop="motto">
        <el-input v-model="regForm.motto"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_reg">立即注册</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/login">已有帐号?立即登录</router-link>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import user from '@/api/user'
export default {
  data(){
    return {
      regForm:{
        name:"",
        password:"",
        sex:"",
        age:"",
        motto:""
      }
    }
  },
  methods:{
    _reg(){
      user._reg(this.regForm).then(res=>{
        this.$message({
          message:res.errmsg,
          type:res.errcode==0?"success":"error"
        })
        if(res.errcode==0){
          this.$refs.regForm.resetFields()
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .regPage
    padding 40px 50px
    width 300px
</style>
