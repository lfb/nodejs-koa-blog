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
    component: () => import(/* webpackChunkName: "articlesList" */ '../views/articles/list.vue')
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
  },
  {
    path: '/column/chapter',
    name: 'columnChapter',
    component: () => import(/* webpackChunkName: "columnChapter" */ '../views/column/chapter.vue')
  },
  {
    path: '/column/chapter/detail',
    name: 'columnChapterDetail',
    component: () => import(/* webpackChunkName: "columnChapterDetail" */ '../views/column/detail.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
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
