import section from '../../api/section'

const state = {}
const mutations = {}
const actions = {
  // 获取专栏章节下的文章列表
  async list({state, commit}, params) {
    return section.list(params);
  },

  // 获取专栏章节下的文章详情
  async detail({state, commit}, params) {
    return section.detail(params);
  },

  // 创建专栏章节下的文章
  async create({state, commit}, params) {
    return section.create(params);
  },

  // 更新专栏章节下的文章
  async update({state, commit}, params) {
    return section.update(params);
  },

  // 删除专栏章节下的文章
  async destroy({state, commit}, id) {
    return section.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
