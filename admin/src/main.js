import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import VueLocalStorage from 'vue-ls';
import 'lib-flexible/flexible';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(VueLocalStorage);
Vue.use(iView);
Vue.use(mavonEditor)

router.beforeEach((to, from, next) => {
  // 设置路由标签名字
  store.dispatch('common/setRouterMetaName', {name: to.meta.name, icon: to.meta.icon});

  const inLoginPage = to.meta.inLoginPage;
  const BOBLOG_ADMIN_TOKEN = Vue.ls.get("BOBLOG_ADMIN_TOKEN");

  if (!BOBLOG_ADMIN_TOKEN && !inLoginPage) {
    window.location.href = '/login';

  } else if (BOBLOG_ADMIN_TOKEN && !inLoginPage) {
    store.dispatch('user/getUserInfo').then(ret => {
      next()

    }).catch(err => {
      next()
    })
  } else {
    next()
  }
});

router.afterEach(() => {

});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
