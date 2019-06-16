import category from '../../api/category'

const state = {}
const mutations = {}
const actions = {
  // 获取分类列表
  async getCategoryList({state, commit}, params) {
    return category.list(params);
  },

  // 获取分类详情
  async getCategory({state, commit}, params) {
    return category.detail(params);
  },

  // 获取分类下的文章
  async getCategoryArticle({state, commit}, params) {
    return category.article(params);
  },

  // 创建分类
  async createCategory({state, commit}, params) {
    return category.create(params);
  },

  // 更新分类
  async updateCategory({state, commit}, params) {
    return category.update(params);
  },

  // 删除分类
  async destroyCategory({state, commit}, id) {
    return category.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
