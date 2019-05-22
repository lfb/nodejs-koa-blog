/**
 * loading
 */

const state = {
  loadingList: [],
  isLoading: true,
}

const mutations = {
  // 开启loading
  PUSH_LOADING(state, playload) {
    state.loadingList.push({text: playload || '拼命加载中..'})
  },
  // 递归删除loading
  SHIFT_LOADING(state) {
    state.loadingList.shift()
  },
  // 控制是否需要loading
  SHOULD_LOADING(state, isShould) {
    state.isLoading = isShould;
  }
}
const getters = {
  isLoading(state) {
    return state.loadingList.length > 0
  },
  loadingText(state) {
    return state.loadingList.length > 0 ? state.loadingList[0].text : null
  },
}
const actions = {
  /**
   * 开启loading
   * @param state
   * @param playload
   */
  openLoading(state, playload) {
    state.commit('PUSH_LOADING', playload)
  },

  /**
   * 关闭loading
   * @param contaxt
   */
  closeLoading(state) {
    state.commit('SHIFT_LOADING')
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
