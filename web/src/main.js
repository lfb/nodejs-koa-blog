import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import VueLocalStorage from 'vue-ls';
import 'lib-flexible/flexible';
import VueLazyLoad from 'vue-lazyload'
import MUSEUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
import Loading from 'muse-ui-loading';
import 'muse-ui-progress/dist/muse-ui-progress.css';
import NProgress from 'muse-ui-progress';
import Toast from 'muse-ui-toast';

Vue.use(NProgress);
Vue.use(Loading);
Vue.use(Toast);
Vue.use(MUSEUI);
Vue.config.productionTip = false;
Vue.use(VueLocalStorage);
Vue.use(VueLazyLoad, {
  // error: './assets/images/BOBLOG-03.png',
  // loading: './assets/images/BOBLOG-03.png'
})
Vue.use(mavonEditor);

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
