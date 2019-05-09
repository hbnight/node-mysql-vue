import fly from 'flyio'

const essay={
  create(data){
    return fly.post('/essayCreate',data)
  },
  getList(){
    return fly.get('/essayList')
  },
  detail(data){
    return fly.get('/essayDetail',data)
  },
  delete(data){
    return fly.post('/deleteEssay',data)
  }
}

export default essay