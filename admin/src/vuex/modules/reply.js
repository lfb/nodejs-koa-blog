import reply from '../../api/reply'

const state = {}
const mutations = {}
const actions = {
  // 获取回复评论列表
  async list({state, commit}, params) {
    return reply.list(params);
  },
  // 删除回复
  async destroy({state, commit}, id) {
    return reply.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
