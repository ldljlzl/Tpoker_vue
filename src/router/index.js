import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import register from '@/components/register'
import signin from '@/components/signin'
import room from '@/components/room'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/room',
      name: 'room',
      component: room
    }
  ]
})
