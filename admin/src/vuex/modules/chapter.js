import chapter from '../../api/chapter'

const state = {}
const mutations = {}
const actions = {
  // 获取专栏章节列表
  async list({state, commit}, params) {
    return chapter.list(params);
  },

  // 获取专栏章节详情
  async detail({state, commit}, params) {
    return chapter.detail(params);
  },

  // 创建专栏章节
  async create({state, commit}, params) {
    return chapter.create(params);
  },

  // 更新专栏章节
  async update({state, commit}, params) {
    return chapter.update(params);
  },

  // 删除专栏章节
  async destroy({state, commit}, id) {
    return chapter.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
