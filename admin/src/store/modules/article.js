import article from '../../api/article'

const state = {
  // 文章列表
  articleList: [],
  // 推荐文章列表
  recommendArticleList: [],
  // 页码
  pagination: null,
  // 文章详情
  articleDetail: null
};

const mutations = {
  // 设置文章列表
  SET_ARTICLE_LIST(state, data) {
    state.articleList = data
  },
  // 推荐文章列表
  SET_RECOMMEND_ARTICLE_LIST(state, data) {
    state.recommendArticleList = data
  },
  // 文章详情
  SET_ARTICLE_DETAIL(state, data) {
    state.articleDetail = data;
  }
};

const actions = {
  /**
   * 获取文章列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async articleList({state, commit}, params) {
    let ret = await article.list(params);
    commit("SET_ARTICLE_LIST", ret.data.data);

    return ret.data.data;
  },

  /**
   * 创建文章
   * @param state
   * @param commit
   * @param params
   */
  async createArticle({state, commit}, params) {
    return await article.create(params);
  },

  /**
   * 删除文章
   * @param state
   * @param commit
   * @param id
   * @return {Promise<void>}
   */
  async hiddenArticle({state, commit}, params) {
    return await article.hidden(params);
  },

  /**
   * 更新文章
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async updateArticle({state, commit}, params) {
    return await article.update(params);
  },

  /**
   * 获取文章详情信息
   * @param state
   * @param commit
   * @param id 文章ID
   * @returns {Promise<void>}
   */
  async getArticleDetail({state, commit}, id) {
    const ret = await article.detail(id);
    commit("SET_ARTICLE_DETAIL", ret.data.data);

    return ret.data.data;
  },

  /**
   * 搜索文章
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async searchArticle({state, commit}, params) {
    let ret = await article.search(params);
    return ret.data.data;
  },

  /**
   * 搜索推荐文章
   * @param state
   * @param commit
   * @param params
   * @return {Promise<*>}
   */
  async recommendArticle({state, commit}, params) {
    if (state.recommendArticleList.length > 0) {
      return state.recommendArticleList;
    } else {
      let ret = await article.list(params);
      commit("SET_RECOMMEND_ARTICLE_LIST", ret.data.data.data);

      return ret.data.data;
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
