import reply from '../../api/reply'

const state = {}

const mutations = {}

const actions = {
  // 新增回复
  async createReply({ state, commit }, params) {
    const r = await reply.create(params)
    return r
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
