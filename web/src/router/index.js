import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
    {
      // 文章列表
      path: '/',
      component(resolve) {
        require(['../views/article/list.vue'], resolve);
      }
    },
    {
      // 文章详情
      path: '/article/detail/:id',
      component(resolve) {
        require(['../views/article/detail.vue'], resolve);
      }
    },
    {
      // 资源
      path: '/source',
      component(resolve) {
        require(['../views/source/list.vue'], resolve);
      }
    },
    {
      // 域名
      path: '/domain',
      component(resolve) {
        require(['../views/domain/list.vue'], resolve);
      }
    },
    {
      // 生活
      path: '/life',
      component(resolve) {
        require(['../views/life/list.vue'], resolve);
      }
    },
    {
      // 关于我
      path: '/about',
      component(resolve) {
        require(['../views/about/index.vue'], resolve);
      }
    }
  ]
})
