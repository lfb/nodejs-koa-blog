import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import VueLocalStorage from 'vue-ls';
import 'lib-flexible/flexible';
import VueLazyLoad from 'vue-lazyload'
import mavonEditor from 'mavon-editor'

import {
  Button,
  Input,
  Form,
  FormItem,
  Message,
  Tabs,
  TabPane,
  Dialog
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);

Vue.prototype.$message = Message;

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
