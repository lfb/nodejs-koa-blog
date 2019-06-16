import comments from '../../api/comments'

const state = {}
const mutations = {}
const actions = {
  // 获取评论列表
  async getCommentsList({state, commit}, params) {
    return comments.list(params);
  },
  // 删除评论
  async destroyComments({state, commit}, id) {
    return comments.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
