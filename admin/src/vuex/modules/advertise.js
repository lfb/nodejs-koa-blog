import advertise from '../../api/advertise'

const state = {}
const mutations = {}
const actions = {
  // 获取分类列表
  async getAdvertiseList({state, commit}, params) {
    return advertise.list(params);
  },

  // 获取分类详情
  async getAdvertise({state, commit}, params) {
    return advertise.detail(params);
  },

  // 创建分类
  async createAdvertise({state, commit}, params) {
    return advertise.create(params);
  },

  // 更新分类
  async updateAdvertise({state, commit}, params) {
    return advertise.update(params);
  },

  // 删除分类
  async destroyAdvertise({state, commit}, id) {
    return advertise.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
