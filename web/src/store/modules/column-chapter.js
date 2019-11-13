import chapter from '../../api/column-chapter'

const state = {}

const mutations = {}

const actions = {
  /**
   * 获取专栏章节列表
   */
  async list({ state, commit }, params) {
    const res = await chapter.list(params)
    return res
  },
  /**
   * 获取专栏章节详情
   *
   */
  async detail({ state, commit }, params) {
    const res = await chapter.detail(params)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
