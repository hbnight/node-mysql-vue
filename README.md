# 用node+mysql+vue搭建一个个人博客
###### node/webpack/vue-cli/mysql默认已安装并配置完成

###### (前后端同步开发,会有多次切换,根据个人习惯制定代码编辑方式)
###### 创建文件凡是以/开头的，均在src目录下


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
创建/utils/fly.js文件

```
import Fly from 'flyio'

Fly.config.baseURL = "http://localhost"
Fly.interceptors.response.use(response=>{
  return response.data
})

export default Fly
```

创建/api/user.js
```
import fly from '@/utils/fly'

const User = {
  _create(){
    return fly.post('create')
  },
  
  _getList(){
    return fly.get('getList')
  },
}

export default User

```

创建/views/home.vue文件





