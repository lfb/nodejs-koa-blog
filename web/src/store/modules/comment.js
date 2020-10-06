import comment from '../../api/comment'

const state = {
  // 评论列表
  commentList: [],
  // 评论页码
  commentPage: null
}

const mutations = {
  // 设置评论列表
  SET_COMMENT_LIST(state, list) {
    state.commentList = list
  },
  // 评论页码
  SET_COMMENT_PAGE(state, data) {
    state.commentPage = data
  }
}

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
