# 用node+mysql+vue搭建一个个人博客
###### node/webpack/vue-cli/mysql默认已安装并配置完成

###### (前后端同步开发,会有多次切换,根据个人习惯制定代码编辑方式)
###### 创建文件凡是以/开头的，前端均在src目录下，后端均在后端项目主目录(本例在blogs_server下)


## 后端
新建一个文件夹 blogs_server
安装express
```
npm i express -g
```

添加一个server.js文件:
```
const Express = require("express") 
const app = Express()

app.get('/',(req,res)=>{
  res.send("server starting...")
})

app.listen(80)
```
node server.js

顺利的话

访问http://192.168.0.108/ 就能看到 server starting...

后台开发时会有多次修改，安装一个热布署插件supervisor

```
npm i supervisor
```
安装完成后执行
```
supervisor server.js
```
后面再修改后台文件项目会自动更新了


## 前端
初始化一个blogs项目
```
vue init webpack blogs
```
初始化完成后进入目录/安装依赖/启动项目
```
cd blogs && npm i && npm run dev
```

## app.vue改成这样
```
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

## 安装flyio
```
npm i flyio
```

#### 创建/utils/fly.js文件

```
import Fly from 'flyio'

Fly.config.baseURL = "http://localhost"
Fly.interceptors.response.use(response=>{
  return response.data
})

export default Fly
```

#### 创建/api/user.js
```
import fly from '@/utils/fly'

const User = {
  _reg(data){
    return fly.post('reg',data)
  },
  _login(data){
    return fly.post('login',data)
  },
}

export default User

```
#### 创建/components/container.vue文件 主框架
```
<template>
  <section>
    <el-container class="conBox">
      <el-header class="eheader">
        
      </el-header>  
      <el-container>
        <el-aside width="180px" class="easide">
          
        </el-aside>
        <el-main class="emain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>  
  </section>  
</template>

<script>
export default {
  name:"container"
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
      padding 20px
    .emain
      overflow auto
</style>
```

#### 创建/views/home.vue文件
```
<template>
  <section>
    <h3>主页</h3>
    <div class="main">
      <router-link to="/list">文章列表</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name:"home",
}
</script>

<style lang="stylus" scoped>
  .main
    .item
      line-height 30px
</style>
```

#### 创建/views/reg.vue 和 /views/login.vue

reg.vue
```
<template>
  <section class="regPage">
    <el-form :model="regForm" label-width="80px" >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="regForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="regForm.password"></el-input>
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
        console.log(res)
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
```

login.vue
```
<template>
  <section class="loginPage">
    <el-form :model="loginForm" ref="loginForm" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
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
        console.log(res)
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
```

#### 添加路由
```
import Vue from 'vue'
import Router from 'vue-router'
import container from '@/components/container'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'name',
      component: container,
      children:[
        {
          path:"home",
          component:r=>require(['@/views/home'],r)
        },
        {
          path:"list",
          component:r=>require(['@/views/list'],r)
        }
      ]
    },
    {
      path:"/reg",
      name:"reg",
      component:r=>require(['@/views/reg'],r)
    },
    {
      path:"/login",
      name:"login",
      component:r=>require(['@/views/login'],r)
    }
  ]
})
```

#### 修改server.js尝试处理下注册和登录两个请求
```
const Express = require("express") 
const app = Express()

// 注册接口
app.post('/reg',(req,res)=>{
  res.send({
    errcode:0,
    errmsg:"注册接口请求成功"
  })
})

// 登录接口
app.post('/login',(req,res)=>{
  res.send({
    errcode:0,
    errmsg:"登录接口请求成功"
  })
})

app.listen(80)
```

#### 请求失败,跨域
```
// 处理跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});
```
到这里前后端就算是有了基础通信了


## 数据库
#### 创建一个blogs库
```
CREATE DATABASE blogs;
```
#### 进入库并创建users表
```
use blogs;
CREATE TABLE user(
  id INT AUTO_INCREMENT,
  user_name VARCHAR(16) NOT NULL,
  password VARCHAR(125) NOT NULL,
  age INT,
  sex INT,
  motto VARCHAR(100),
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## 后端
#### 创建/sql/sql_user.js
```
const mysql = require('mysql')
const sql = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'NightFox91',
  database:'blogs'
})

const sql_user = {
  // 创建用户
  _create(Obj){
    return new Promise((resolve,reject)=>{
      sql.query("SELECT * FROM user WHERE user_name='"+ Obj.name +"'",(err,rows)=>{
        if(err){
          reject(err)
          return;
        }
        if(rows.length>0){
          resolve(rows)
        }else{
          sql.query("INSERT INTO user(user_name,password,age,sex,motto) VALUES (?,?,?,?,?)",[Obj.name,Obj.password,Obj.age||0,Obj.sex||0,Obj.motto||""],(err,result)=>{
            if(err){
              reject(err)
            }
            resolve()
          })
        }
      })
    })
  },

  // 登录
  _login(Obj){
    return new Promise((resolve,reject)=>{
      sql.query('SELECT * FROM user WHERE user_name="'+Obj.name+'"',(err,rows)=>{
        console.log(err)
        if(err){
          reject()
          return;
        }
        if(rows.length==0){
          reject("无此用户")
        }else{
          sql.query('SELECT * FROM user WHERE user_name="'+Obj.name+'" AND password="'+Obj.password+'"',(err,rows)=>{
            if(rows.length==0){
              reject("密码错误")
            }else{
              resolve(rows[0])
            }
          })
        }
      })
    })
  },

  // 查看用户信息
  _getInfo(id){
    return new Promise((resolve,reject)=>{
      sql.query('SELECT * FROM user WHERE id="'+id+'"',(err,rows)=>{
        if(err){
          reject()
          return;
        }
        if(rows.length==0){
          reject("无此用户")
        }else{
          resolve(rows[0])
        }
      })
    })
  }
}

module.exports = sql_user;
```

#### 修改server.js文件，注册/登录/查看用户信息,修改之后的文件为
```
const Express = require("express") 
const app = Express()
const bodyparser = require('body-parser')   //　用于获取
const sql_user = require('./sql/sql_user')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}))


// 处理跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

// 注册接口
app.post('/reg',(req,res)=>{
  sql_user._create(req.body).then(data=>{
    if(data){
      res.send({
        errcode:1,
        errmsg:"用户名已存在"
      })
    }else{
      res.send({
        errcode:0,
        errmsg:"注册成功"
      })
    } 
  })
})

// 登录接口
app.post('/login',(req,res)=>{
  sql_user._login(req.body).then(data=>{
    res.send({
      errcode:0,
      errmsg:"登录成功",
      data
    })
  }).catch(e=>{
    res.send({
      errcode:1,
      errmsg:e
    })
  })
})

// 查看用户信息
app.get('/getUser',(req,res)=>{
  sql_user._getInfo(req.query.id).then(data=>{
    res.send({
      errcode:0,
      errmsg:"成功",
      data
    })
  }).catch(e=>{
    res.send({
      errcode:1,
      errmsg:e
    })
  })
})

app.listen(80)
```

## 前端
##### 完善/components/container.vue、/views/home.vue、/views/login.vue、/views/reg.vue四个文件

#### /components/container.vue
```
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

```
#### /views/home.vue
```
<template>
  <section>
    <h3>主页</h3>
    <div class="main">
      <router-link to="/list">文章列表</router-link>
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
```

#### /views/reg.vue
```
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
```

#### /views/login.vue
```
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
```
到这个，登录/注册/查看信息功能基本能用了.


