import category from '../../api/category'
import article from './article'

const state = {
  // 分类列表
  categoryList: []
};

const mutations = {
  // 设置分类列表
  SET_CATEGORY_LIST(state, data) {
    state.categoryList = data
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
  async getCategoryList({state, commit}, params) {
    let ret = await category.list(params);

    commit('SET_CATEGORY_LIST', ret);

    return ret;
  },

  /**
   * 查询分类ID下的所有文章列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async getCategoryArticle({state, commit}, params) {
    return  await category.article(params);

  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
