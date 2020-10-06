const state = {
  navIndex: 0
}

const mutations = {
  // 设置导航索引
  SET_NAV_INDEX (state, index) {
    state.navIndex = index
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
