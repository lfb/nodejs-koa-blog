import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Storage from 'vue-ls'
import 'lib-flexible/flexible'
import 'view-design/dist/styles/iview.css'

import { Input, Icon, Button } from 'view-design'

Vue.component('Input', Input)
Vue.component('Icon', Icon)
Vue.component('Button', Button)

Vue.config.productionTip = false

Vue.use(Storage, {
  namespace: 'boblog__',
  name: 'ls',
  storage: 'local'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
