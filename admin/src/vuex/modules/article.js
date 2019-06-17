import article from '../../api/article'

const state = {}
const mutations = {}
const actions = {
  // 获取文章列表
  async getArticleList({state, commit}, params) {
    return article.list(params);
  },

  // 获取文章详情
  async getArticle({state, commit}, params) {
    return article.detail(params);
  },

  // 创建文章
  async createArticle({state, commit}, params) {
    return article.create(params);
  },

  // 更新文章
  async updateArticle({state, commit}, params) {
    return article.update(params);
  },

  // 删除文章
  async destroyArticle({state, commit}, id) {
    return article.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
