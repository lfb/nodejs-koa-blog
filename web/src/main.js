import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import VueLocalStorage from 'vue-ls';
import 'lib-flexible/flexible';
import VueLazyLoad from 'vue-lazyload'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueLocalStorage);
Vue.use(VueLazyLoad, {
  error: '../static/lazyloading.svg',
  loading: '../static/lazyloading.svg'
})

router.beforeEach((to, from, next) => {
  next()
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
