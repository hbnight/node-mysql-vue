<template>
  <section>
    <h3>主页</h3>
    <div class="main">
      <router-link to="/essaylist">文章列表</router-link>
    </div>
  </section>
</template>

<script>
import user from '@/api/user'
export default {
  name:"home",
  mounted(){
    if(localStorage.getItem('userInfo')){
      user._getInfo({id:JSON.parse(localStorage.getItem('userInfo')).id}).then(res=>{

      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    .item
      line-height 30px
</style>



