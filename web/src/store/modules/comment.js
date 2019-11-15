import comment from '../../api/comment'

const state = {}

const mutations = {}

const actions = {
  // 获取评论列表
  async getCommentList({ state, commit }, params) {
    const r = await comment.list(params)
    return r
  },

  async createComment({ state, commit }, params) {
    const r = await comment.create(params)
    return r
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
