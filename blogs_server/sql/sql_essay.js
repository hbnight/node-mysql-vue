const mysql = require('mysql')
const tablesname = "essay"
const sql = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'NightFox91',
  database:"blogs"
})

const sql_essay = {
  // 创建文章
  _create(Obj){
    return new Promise((resolve,reject)=>{
      if(!Obj.title){
        reject("标题必需")
        return;
      }
      if(!Obj.content){
        reject("内容必需")
        return;
      }
      sql.query("INSERT INTO "+tablesname+"(title,content,author_id) VALUES (?,?,?)",[Obj.title,Obj.content,Obj.author_id||0],(err,result)=>{
        if(err){
          reject(err)
        }
        resolve()
      })
    })
  },

  // 文章列表
  _getList(){
    return new Promise((resolve,reject)=>{
      sql.query('SELECT title,author_id,id FROM essay',(err,row)=>{
        if(err){
          reject(err)
        }
        row.map((v,i)=>{
          sql.query('SELECT user_name,id FROM user WHERE id='+v.author_id,(errs,rows)=>{
            v.author=rows[0]||{}
            if(i==row.length-1){
              resolve(row)
            }
          })
        })
      })
    })
  },

  // 删除文章
  _deleteEssay(id){
    return new Promise((resolve,reject)=>{
      sql.query('SELECT id FROM '+tablesname+' WHERE id='+id,(err,row)=>{
        if(err){
          reject("删除失败")
        }
        if(row.length==0){
          reject("该文章已被删除")
        }
        sql.query('DELETE FROM '+tablesname+' WHERE id='+id,(err,row)=>{
          if(err){
            reject("删除失败")
          }
          resolve()
        })
      })
    })
  },

  // 查看详情
  _detail(id){
    return new Promise((resolve,reject)=>{
      sql.query('SELECT * FROM '+tablesname+' WHERE id="'+id+'"',(errs,rows)=>{
        if(errs){
          reject()
        }
        sql.query('SELECT id,user_name FROM user WHERE id="'+rows[0].author_id+'"',(err,row)=>{
          rows[0].author=row[0]
          resolve(rows[0])
        })
      })
    })
  }
}


module.exports = sql_essay;