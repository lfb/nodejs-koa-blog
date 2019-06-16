import article from '../../api/article'

const state = {
  // 文章
  articleList: [],
  // 分页
  pagination: null,
  // 文章详情
  articleDetail: null,
};

const mutations = {
  // 设置文章列表
  SET_ARTICLE_LIST(state, list) {
    state.articleList = list
  },
  // 设置文章分页
  SET_PAGINATION(state, page) {
    state.pagination = page
  },
  // 设置文章详情
  SET_ARTICLE_DETAIL(state, data) {
    state.articleDetail = data
  },
};

const actions = {

  /**
   * 获取文章列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async getArticleList({state, commit}, params) {
    let res = await article.list(params);
    commit('SET_ARTICLE_LIST', res.data.data.data);
    commit('SET_PAGINATION', res.data.data.meta);

    return res;
  },

  /**
   * 获取文章详情信息
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async getArticleDetail({state, commit}, id) {
    let ret = await article.detail(id);
    commit('SET_ARTICLE_DETAIL', ret);

    return ret;
  },
  /**
   * 搜索文章详情信息
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async searchArticle({state, commit}, params) {
    let ret = await article.search(params);
    commit('SET_ARTICLE_LIST', ret.data.data);

    return ret;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
