import comments from '../../api/comments'

const state = {};

const mutations = {};

const actions = {
  // 获取评论列表
  async getCommentsList({state, commit}, params) {
    return await comments.list(params)
  },

  async createComments({state,commit}, params){
    return await comments.create(params)
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
