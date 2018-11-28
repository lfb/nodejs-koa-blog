## vue-cli-project
- 👨‍💻‍已构建配置好的vuejs全家桶项目，统一管理后端接口 | 获取数据 | 请求数据，已包含vue-router，vuex，api，axios. webpack, 储存用vue-ls, 异步async/await, css less. 下载即使用项目开发。
- 喜欢或对你有帮助的话请点star✨✨，Thanks.
> A Vue.js project

### 使用

``` bash
# 安装服务
npm install

# 启动服务
npm run dev

```

### 说明

#### src架构

```
├── App.vue
├── api
│   ├── doctor.js
│   └── fetch.js
├── assets
│   └── logo.png
├── components
│   └── HelloWorld.vue
├── libs
│   └── util.js
├── main.js
├── router
│   └── index.js
├── store
│   ├── index.js
│   ├── modules
│   └── mutation-types.js
└── views
    └── doctor
```



处理数据页面这2大块，把数据和页面分离，在vuex里面做请求数据，页面只需要做调用数据。

请求接口这块再细分，接口和请求接口分开，我使用了最新的async/await函数做数据请求

#### api文件夹 主要放后端提供的接口，如


```js
import fetch from './fetch';

export default {
  // 获取医生列表
  list(params) {
    return fetch.get('/doctor/list', params)
  },

  // 获取医生详情信息
  detail(id) {
    return fetch.post('/doctor/detail/' + id);
  },
}
```

#### fetch.js 文件是封装axios请求，以及请求处理，和http状态码的等处理

```js
import Util from '../libs/util'
import qs from 'qs'
import Vue from 'vue'

Util.ajax.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
};

Util.ajax.interceptors.request.use(config => {
  /**
   * 在这里做loading ...
   * @type {string}
   */

  // 获取token
  config.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get("web-token");
  return config

}, error => {
  return Promise.reject(error)

});

Util.ajax.interceptors.response.use(response => {

  /**
   * 在这里做loading 关闭
   */

    // 如果后端有新的token则重新缓存
  let newToken = response.headers['new-token'];

  if (newToken) {
    Vue.ls.set("web-token", newToken);
  }

  return response;

}, error => {
  let response = error.response;
  if (response.status == 401) {
    // 处理401错误

  } else if (response.status == 403) {
    // 处理403错误

  } else if (response.status == 412) {
    // 处理412错误

  } else if (response.status == 413) {
    // 处理413权限不足

  }

  return Promise.reject(response)

});

export default {
  post(url, data) {

    return Util.ajax({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },

  get(url, params) {
    return Util.ajax({
      method: 'get',
      url: url,
      params,
    })
  },

  delete(url, params) {
    return Util.ajax({
      method: 'delete',
      url: url,
      params
    })
  },

  put(url, data) {

    return Util.ajax({
      method: 'put',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  }
}

```


#### 在vuex里面做请求，比如请求医生列表，用async/await，拿到数据存进store数据里面


```js
├── index.js
├── modules
│   └── doctor.js
└── mutation-types.js

import doctor from '../../api/doctor'
import * as types from '../mutation-types'

const state = {
  // 医生列表
  doctorList: [],
  // 医生详情信息
  doctorDetail: null,
};

const mutations = {
  // 设置医生列表
  [types.SET_DOCTOR_LIST](state, data) {
    state.doctorList = data
  },
  // 设置医生详情信息
  [types.SET_DOCTOR_DETAIL](state, data) {
    state.doctorDetail = data
  },
};

const actions = {

  /**
   * 获取医生顾问列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async getDoctorList({state, commit}, params) {
    let ret = await doctor.list(params);
    commit(types.SET_DOCTOR_LIST, ret.data.data);
  },

  /**
   * 获取医生详情信息
   * @param state
   * @param commit
   * @param id 医生ID
   * @returns {Promise<void>}
   */
  async getDoctorDetail({state, commit}, id) {
    let ret = await doctor.detail(id);
    commit(types.SET_DOCTOR_DETAIL, ret.data.data);
  }
};

export default {
  state,
  actions,
  mutations
}

```

#### 在页面里需要执行引入：

```js
import {mapActions, mapState} from 'vuex'
```

#### 代码可以具体看文件的代码


```js
└── doctor
    ├── detail.vue
    └── list.vue

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    components: {},
    data() {
      return {}
    },
    computed: {
      ...mapState({
        doctorList: state => state.doctor.doctorList,
      })
    },
    async created() {
      // 医生类型
      let params = {type: 'EXP'};
      // 获取医生列表
      await this.getDoctorList(params);
    },
    methods: {
      ...mapActions([
        // 获取医生列表
        'getDoctorList'
      ]),

      // 路由跳转方法
      routeLink(link) {
        this.$router.push({path: link});
      },
    }
  }
</script>
```

#### 核心就是把API数据和页面分离，细分把接口，请求API数据方法放在vuex做处理，在页面映射vuex的mapActions提供的接口方法获取数据，做统一管理项目。喜欢或对你有帮助的话请点star✨✨，Thanks.
