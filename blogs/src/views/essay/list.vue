<template>
  <section class="essayList">
    <h3>文章列表</h3>
    <el-button @click="$router.push('/essayCreate')">+添加文章</el-button>
    <el-table :data="essayList">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author.user_name" label="作者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button type="text" @click="_detail(scoped.row)">查看详情</el-button>
          <el-button type="text" style="color:#ff4949" @click="_delete(scoped.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>  
</template>

<script>
import essay from '@/api/essay'
export default {
  data(){
    return{
      essayList:[]
    }
  },
  methods:{
    _delete(item){
      this.$confirm("是否删除该文章?").then(()=>{
        essay.delete({id:item.id}).then(res=>{
          this.$message({
            message:res.errmsg,
            type:res.errcode==0?"success":"error"
          })
          if(res.errcode==0){
            this.getList();
          }
        })
      })
    },
    _detail(item){
      this.$router.push('/essayDetail/'+item.id)
    },
    getList(){
      essay.getList().then(res=>{
        if(res.errcode==0){
          this.essayList=res.data
        }
      })
    }
  },
  mounted(){
    this.getList()
  }
}
</script>

<style>

</style>
