import { getCategory } from '@/request/api/category'
const state = () => ({
  categoryList: [],
})

const mutations = {
  SET_CATEGORY_LIST(state, data) {
    state.categoryList = data
  },

}

const actions = {
  async getCategoryData({ state, commit }, params = {}) {
    if (Array.isArray(state.categoryList) && state.categoryList.length > 0) {
      return state.categoryList
    } else {
      const [err, res] = await getCategory(params)
      if (!err) {
        const category = res.data.data.data
        commit('SET_CATEGORY_LIST', category)
        return category
      } else {
        return err
      }
    }
  },
}

export default {
  namespace: true,
  state,
  actions,
  mutations
}
