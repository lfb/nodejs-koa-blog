import category from '../../api/category'

const state = {
  // 分类列表
  categoryList: []
};

const mutations = {
  // 设置分类列表
  SET_CATEGORY_LIST(state, data) {
    state.categoryList = data
  },
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
    if (state.categoryList.length > 0) {
      return state.categoryList;

    } else {
      let ret = await category.list(params);
      commit("SET_CATEGORY_LIST", ret.data.data);

      return ret.data.data;
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
