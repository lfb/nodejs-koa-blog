import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
  },
  {
    path: '/articles',
    name: 'article-list',
    component: () => import(/* webpackChunkName: "articleList" */ '../views/articles/list.vue')
  },
  {
    path: '/article/detail',
    name: 'article-detail',
    component: () => import(/* webpackChunkName: "articleDetail" */ '../views/articles/detail.vue')
  },
  {
    path: '/column',
    name: 'column-list',
    component: () => import(/* webpackChunkName: "columnList" */ '../views/column/list.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
