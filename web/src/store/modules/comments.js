import comments from '../../api/comments'

const state = {}

const mutations = {}

const actions = {
  // 获取评论列表
  async getCommentsList({ state, commit }, params) {
    const r = await comments.list(params)
    return r
  },

  async createComments({ state, commit }, params) {
    const r = await comments.create(params)
    return r
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
