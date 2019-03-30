import category from '../../api/category'

const state = {
  // 分类列表
  categoryList: [],
  // 文章详情
  categoryDetail: null
};

const mutations = {
  // 设置分类列表
  SET_CATEGORY_LIST(state, data) {
    state.categoryList = data
  },
  // 分类详情
  SET_CATEGORY_DETAIL(state, data) {
    state.categoryDetail = data;
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
    let ret = await category.list(params);
    commit("SET_CATEGORY_LIST", ret.data.data);

    return ret.data.data;
  },


  /**
   * 创建分类
   * @param state
   * @param commit
   * @param params
   */
  async createCategory({state, commit}, params) {
    return await category.create(params);
  },

  /**
   * 删除分类
   * @param state
   * @param commit
   * @param id
   * @return {Promise<void>}
   */
  async deleteCategory({state, commit}, id) {
    return await category.delete(id);
  },

  /**
   * 更新分类
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async updateCategory({state, commit}, params) {
    return await category.update(params);
  },

  /**
   * 获取分类详情信息
   * @param state
   * @param commit
   * @param id 分类ID
   * @returns {Promise<void>}
   */
  async getCategoryDetail({state, commit}, id) {
    const ret = await category.detail(id);

    commit("SET_CATEGORY_DETAIL", ret.data.data);

    return ret.data.data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
