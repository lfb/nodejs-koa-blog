import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Storage from 'vue-ls'
import 'lib-flexible/flexible'
import 'view-design/dist/styles/iview.css'
import VueLazyLoad from 'vue-lazyload'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import {
  Input,
  Icon,
  Button,
  Drawer,
  Avatar,
  Page,
  BackTop,
  Form,
  FormItem,
  Message,
  Modal
} from 'view-design'

Vue.component('Input', Input)
Vue.component('Icon', Icon)
Vue.component('Button', Button)
Vue.component('Drawer', Drawer)
Vue.component('Avatar', Avatar)
Vue.component('Page', Page)
Vue.component('BackTop', BackTop)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Modal', Modal)

Vue.use(VueLazyLoad, {
  error: require('./assets/images/logo.png'),
  loading: require('./assets/images/logo.png')
})

Vue.use(mavonEditor)

Vue.prototype.$Message = Message
Vue.config.productionTip = false

Vue.use(Storage, {
  namespace: 'boblog__',
  name: 'ls',
  storage: 'local'
})

router.beforeEach(async (to, from, next) => {
  store.commit('headers/SET_NAV_INDEX', to.meta.navIndex)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
