import articles from '@/api/articles'

const state = {}

const mutations = {}

const actions = {
  /**
   * 获取文章列表
   */
  async getArticleList ({ state, commit }, params) {
    const res = await articles.list(params)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
