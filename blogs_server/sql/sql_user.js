const mysql = require('mysql')
const sql = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'******',
  database:'blogs'
})

const sql_user = {
  // 创建用户
  _create(Obj){
    return new Promise((resolve,reject)=>{
      if(!Obj.name){
        reject("用户名必需")
      }
      if(!Obj.password){
        reject("密码必需")
      }
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
