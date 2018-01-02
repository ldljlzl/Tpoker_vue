import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import register from '@/components/register'
import login from '@/components/login'
import lobby from '@/components/lobby'
import room from '@/components/room1'


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
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: lobby
    },
    {
      path: '/room',
      name: 'room',
      component: room
    }
  ]
})
