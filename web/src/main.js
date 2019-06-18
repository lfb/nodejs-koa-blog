import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import VueLocalStorage from 'vue-ls';
import 'lib-flexible/flexible';
import VueLazyLoad from 'vue-lazyload'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import {
  Button,
  Input,
  Form,
  FormItem,
  Message,
  Tabs,
  TabPane,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Tag,
  Icon
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Icon);

Vue.prototype.$message = Message;

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueLocalStorage);
Vue.use(VueLazyLoad, {
  error: '../static/boblog.png',
  loading: '../static/boblog.png'
})

router.beforeEach(async (to, from, next) => {

  // 获取用户信息
  const BOBLOG_FE_TOKEN = Vue.ls.get('BOBLOG_FE_TOKEN');
  if (BOBLOG_FE_TOKEN) {

    const auth = {
      username: BOBLOG_FE_TOKEN
    }

    try {
      await store.dispatch('user/getUserInfo', auth);
      await next()

    } catch (e) {
      await next()
    }

    await next()

  } else {
    await next()
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
