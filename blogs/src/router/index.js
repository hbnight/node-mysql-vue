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
          path:"essaylist",
          component:r=>require(['@/views/essay/list'],r)
        },
        {
          path:"essayCreate",
          component:r=>require(['@/views/essay/create'],r)
        },
        {
          path:"essayDetail/:id",
          component:r=>require(['@/views/essay/detail'],r)
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
