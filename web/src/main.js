import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Storage from 'vue-ls'
import 'lib-flexible/flexible'
import 'view-design/dist/styles/iview.css'

import { Input, Icon, Button, Drawer, Avatar, Form, FormItem } from 'view-design'

Vue.component('Input', Input)
Vue.component('Icon', Icon)
Vue.component('Button', Button)
Vue.component('Drawer', Drawer)
Vue.component('Avatar', Avatar)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)

Vue.config.productionTip = false

Vue.use(Storage, {
  namespace: 'boblog__',
  name: 'ls',
  storage: 'local'
})

router.beforeEach(async (to, from, next) => {
  console.log(to.meta.navIndex)
  store.commit('headers/SET_NAV_INDEX', to.meta.navIndex)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
