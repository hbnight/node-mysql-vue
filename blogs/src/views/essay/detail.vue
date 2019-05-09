<template>
  <section>
    <center>
      <h3>{{detail.title}}</h3>
      <p v-if="detail.author" class="authorMsg">作者: {{detail.author.user_name}}</p>
    </center>
    <div class="contentMsg">
      <div class="contentItem" v-for="(item,i) in detail.content" :key="i">
        {{item}}
      </div>
    </div>
  </section>  
</template>

<script>
import essay from '@/api/essay'
export default {
  data(){
    return {
      detail:{
        title:"",
        content:[]
      }
    }
  },
  methods:{
    essayDetail(id){
      essay.detail({id}).then(res=>{
        res.data.content = res.data.content.split(/\n/);
        this.detail=res.data
      })
    }
  },
  mounted(){
    this.essayDetail(this.$route.params.id)
  }
}
</script>

<style lang="stylus" scoped>
  .contentItem
    text-indent 2em
    line-height 30px
    margin-bottom 20px
  .authorMsg
    border-bottom 1px solid #c7c7c7
    font-size 12px
    line-height 30px
</style>
