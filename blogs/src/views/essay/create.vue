<template>
  <section>
    <h2>新建文章</h2>  
    <el-form :model="essayMsg" label-width="50px" style="max-width:600px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="essayMsg.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="正文" prop="password">
        <textarea v-model="essayMsg.content" style="width:100%;resize:none;height:400px"></textarea>
      </el-form-item>
      <el-form-item>
        <el-button @click="create">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>  
</template>

<script>
import essay from '@/api/essay'
export default {
  data(){
    return{
      essayMsg:{
        title:"",
        content:""
      }
    }
  },
  methods:{
    create(){
      this.essayMsg.author_id = JSON.parse(localStorage.getItem("userInfo")).id
      essay.create(this.essayMsg).then(res=>{
        this.$message({
          message:res.errmsg,
          type:res.errcode==0?"success":"error"
        })
        if(res.errcode==0){
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style>

</style>
