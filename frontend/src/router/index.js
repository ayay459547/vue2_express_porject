import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/menu/Home/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { path: '/home' },
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/404',
    name: 'NoPage',
    component: () => import('@/views/NoPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
