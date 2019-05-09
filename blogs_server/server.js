const Express = require("express") 
const app = Express()
const bodyparser = require('body-parser')   //　用于获取
const sql_user = require('./sql/sql_user')
const sql_essay = require('./sql/sql_essay')

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
  sql_user._create(req.body).then(()=>{
    res.send({
      errcode:0,
      errmsg:"注册成功"
    })
  }).catch(e=>{
    res.send({
      errcode:1,
      errmsg:e
    })
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


// 添加文章
app.post('/essayCreate',(req,res)=>{
  sql_essay._create(req.body).then(data=>{
    res.send({
      errcode:0,
      errmsg:"添加成功"
    })
  }).catch(e=>{
    res.send({
      errcode:1,
      errmsg:e
    })
  })
})

// 文章列表
app.get('/essayList',(req,res)=>{
  sql_essay._getList().then(data=>{
    res.send({
      errcode:0,
      errmsg:"",
      data
    })
  })
})

// 删除文章
app.post('/deleteEssay',(req,res)=>{
  sql_essay._deleteEssay(req.body.id).then(data=>{
    res.send({
      errcode:0,
      errmsg:"删除成功"
    })
  }).catch(e=>{
    res.send({
      errcode:0,
      errmsg:e
    })
  })
})

// 文章详情
app.get('/essayDetail',(req,res)=>{
  sql_essay._detail(req.query.id).then(data=>{
    res.send({
      errcode:0,
      errmsg:"",
      data
    })
  })
})

app.listen(80)