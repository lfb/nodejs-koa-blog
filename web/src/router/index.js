import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      navIndex: 0
    },
    name: 'article-list',
    component: () => import(/* webpackChunkName: "articlesList" */ '../views/articles/list.vue')
  },
  {
    path: '/article/detail',
    meta: {
      navIndex: -1
    },
    name: 'article-detail',
    component: () => import(/* webpackChunkName: "articleDetail" */ '../views/articles/detail.vue')
  },
  {
    path: '/about',
    meta: {
      navIndex: 1
    },
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.PUBLIC_PATH,
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 兼容
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
