import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  // 哈斯
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // 兼容
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    // 文章首页
    {
      path: '/',
      component(resolve) {
        require(['../views/article/list.vue'], resolve);
      }
    },
    // 文章内容
    {
      path: '/article/detail/:id',
      component(resolve) {
        require(['../views/article/detail.vue'], resolve);
      }
    }
  ]
})
