import Vue from 'vue'
import {
  Icon,
  Drawer,
  Dialog,
  Button,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Input,
  Loading,
  MessageBox,
  Message,
} from 'element-ui'

import locale from 'element-ui/lib/locale/lang/en'

const components = [
  Icon,
  Button,
  Avatar,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Input,
  Drawer
]
const Element = {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

Vue.use(Element, { locale })
