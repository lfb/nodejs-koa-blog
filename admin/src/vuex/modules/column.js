import column from '../../api/column'

const state = {}
const mutations = {}
const actions = {
  // 获取专栏列表
  async list({state, commit}, params) {
    return column.list(params);
  },

  // 获取专栏详情
  async detail({state, commit}, params) {
    return column.detail(params);
  },

  // 创建专栏
  async create({state, commit}, params) {
    return column.create(params);
  },

  // 更新专栏
  async update({state, commit}, params) {
    return column.update(params);
  },

  // 删除专栏
  async destroy({state, commit}, id) {
    return column.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
