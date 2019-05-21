import category from '../../api/category'
import article from './article'

const state = {
  // 分类列表
  categoryList: []
};

const mutations = {
  // 设置分类列表
  SET_CATEGORY_LIST(state, list) {
    state.categoryList = list
  }
};

const actions = {

  /**
   * 获取分类列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async getCategoryList({state, commit}, params) {
    let res = await category.list(params);
    commit('SET_CATEGORY_LIST', res.data.data);

    return res;
  },

  /**
   * 查询分类ID下的所有文章列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async getCategoryArticle({state, commit}, id) {
    return await category.article(id);

  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
