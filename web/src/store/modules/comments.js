import comments from '../../api/comments'

const state = {};

const mutations = {};

const actions = {
  // 获取评论列表
  async getCommentsList({state, commit}, id) {
    return await comments.list(id)
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
