import column from '../../api/column'

const state = {}

const mutations = {}

const actions = {
  /**
   * 获取专栏列表
   */
  async list({ state, commit }, params) {
    const res = await column.list(params)
    return res
  },
  /**
   * 获取专栏详情
   *
   */
  async detail({ state, commit }, parms) {
    const res = await column.detail(parms)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
