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
      // 首页
      path: '/',
      component(resolve) {
        require(['../views/main/app.vue'], resolve);
      },
      children: [
        {
          // 管理员列表
          path: 'user/lock',
          name: 'userList',
          meta: {
            name: '权限分配',
            icon: 'md-lock'
          },
          component(resolve) {
            require(['../views/user/lock.vue'], resolve);
          }
        },
        {
          // 管理员信息
          path: 'user/index',
          name: 'userIndex',
          meta: {
            name: '首页',
            icon: 'md-list'
          },
          component(resolve) {
            require(['../views/user/index.vue'], resolve);
          }
        },
        {
          // 文章列表
          path: 'article/list',
          name: 'articleList',
          meta: {
            name: '文章列表',
            icon: 'md-list'
          },
          component(resolve) {
            require(['../views/article/list.vue'], resolve);
          },
        },
        {
          // 新增文章
          path: 'article/create',
          name: 'articleCreate',
          meta: {
            name: '新增文章',
            icon: 'md-add'
          },
          component(resolve) {
            require(['../views/article/create.vue'], resolve);
          }
        },
        {
          // 更新文章
          path: 'article/update/:id',
          name: 'articleCreate',
          meta: {
            name: '更新文章',
            icon: 'md-book'
          },
          component(resolve) {
            require(['../views/article/update.vue'], resolve);
          }
        },
        {
          // 分类列表
          path: 'category/list',
          name: 'categoryList',
          meta: {
            name: '分类列表',
            icon: 'md-list'
          },
          component(resolve) {
            require(['../views/category/list.vue'], resolve);
          }
        },
        {
          // 新增分类
          path: 'category/create',
          name: 'categoryCreate',
          meta: {
            name: '新增分类',
            icon: 'md-add'
          },
          component(resolve) {
            require(['../views/category/create.vue'], resolve);
          }
        },
        {
          // 新增分类
          path: 'category/update/:id',
          name: 'categoryUpdate',
          meta: {
            name: '更新分类',
            icon: 'md-book'
          },
          component(resolve) {
            require(['../views/category/update.vue'], resolve);
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        inLoginPage: true
      },
      component(resolve) {
        require(['../views/user/login.vue'], resolve);
      }
    }
  ]
})
