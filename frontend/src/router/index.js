import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { path: '/Setting' },
    name: 'Layout',
    component: Layout
  },
  {
    path: '/login',
    name: 'Login',
    component:  () => import('@/views/Login')
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
