const state = {
  loadingList: [],
  isLoading: true
}

const mutations = {
  // 开启loading
  PUSH_LOADING (states, playload) {
    states.loadingList.push({
      text: playload || '加载中..'
    })
  },
  // 递归删除loading
  SHIFT_LOADING (states) {
    states.loadingList.shift()
  },
  // 控制是否需要loading
  SHOULD_LOADING (states, isShould) {
    states.isLoading = isShould
  }
}
const getters = {
  isLoading (states) {
    return states.loadingList.length > 0
  },
  loadingText (states) {
    return states.loadingList.length > 0 ? states.loadingList[0].text : null
  }
}
const actions = {
  /**
   * 开启loading
   * @param states
   * @param playload
   */
  openLoading (states, playload) {
    states.commit('PUSH_LOADING', playload)
  },

  /**
   * 关闭loading
   * @param contaxt
   */
  closeLoading (states) {
    states.commit('SHIFT_LOADING')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
