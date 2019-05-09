import fly from '@/utils/fly'

const User = {
  _reg(data){
    return fly.post('reg',data)
  },
  _login(data){
    return fly.post('login',data)
  },
  _getInfo(data){
    return fly.get('getUser',data)
  },
}

export default User
