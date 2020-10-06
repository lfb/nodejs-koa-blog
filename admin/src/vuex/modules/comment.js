import comment from '../../api/comment'

const state = {}
const mutations = {}
const actions = {
  // 获取评论列表
  async getCommentsList({state, commit}, params) {
    return comment.list(params);
  },
  // 删除评论
  async destroyComments({state, commit}, id) {
    return comment.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
