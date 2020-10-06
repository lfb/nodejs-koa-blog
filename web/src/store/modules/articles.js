import articles from '../../api/articles'

const state = {}

const mutations = {}

const actions = {
  /**
   * 获取文章列表
   */
  async list({ state, commit }, params) {
    const res = await articles.list(params)
    return res
  },
  /**
   * 获取文章详情
   *
   */
  async detail({ state, commit }, params) {
    const res = await articles.detail(params)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
