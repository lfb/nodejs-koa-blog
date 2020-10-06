import advertise from '../../api/advertise'

const state = {
  // 广告列表
  advertiseList: []
}

const mutations = {
  // 设置广告列表
  SET_ADVERTISE_LIST(state, list) {
    state.advertiseList = list
  }
}

const actions = {

  /**
   * 获取广告列表
   */
  async list({ state, commit }, params) {
    if (state.advertiseList && state.advertiseList.length > 0) {
      return state.advertiseList
    }
    let res = await advertise.list(params)
    commit('SET_ADVERTISE_LIST', res.data.data.data)
    return res
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
