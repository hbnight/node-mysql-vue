<template>
  <section>
    <el-container class="conBox">
      <el-header class="eheader">
        <el-row>
          <el-col :span="20">博客</el-col>
          <el-col :span="4">
            <el-button type="text" style="color:#fff" @click="_logOut">退出</el-button>
          </el-col>
        </el-row>
      </el-header>  
      <el-container>
        <el-aside width="180px" class="easide">
          <p>用户名:{{userInfo.user_name}}</p>
          <p>性别:{{userInfo.sex==1?"男":userInfo.sex==2?"女":"保密"}}</p>
          <p>年龄:{{userInfo.age||"保密"}}</p>
          <p>格言:{{userInfo.motto}}</p>
        </el-aside>
        <el-main class="emain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>  
  </section>  
</template>

<script>
  import user from '@/api/user'
  export default {
    name:"container",
    data(){
      return{
        userInfo:{}
      }
    },
    mounted(){
      if(localStorage.getItem('userInfo')){
        user._getInfo({id:JSON.parse(localStorage.getItem('userInfo')).id}).then(res=>{
          if(res.errcode==0){
            this.userInfo=res.data
          }
        })
      }else{
        this.$router.push('/login')
      }
    },
    methods:{
      _logOut(){
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .conBox
    height 100vh
    .eheader
      line-height 60px
      background #858585
      text-align center
    .easide
      background #e7e7e7
      box-sizing border-box
      font-size 14px
      color #3520d6
      padding 20px
    .emain
      overflow auto
</style>
