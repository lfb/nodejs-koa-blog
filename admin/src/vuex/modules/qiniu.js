import qiniu  from '../../api/qiniu'
import * as types from '../mutation-types'

const state = {
  data: {},
}

const mutations = {

  [types.SET_USER_INFO](state, data) {
    state.data = data
  }

}

const actions = {


}

export default {
  state,
  actions,
  mutations
}