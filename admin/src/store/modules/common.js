const state = {
  routerMetaName: {}
}

const mutations = {
  SET_ROUTER_META_NAME(state, data) {
    state.routerMetaName = data;
  }
}

const actions = {
  /**
   * 设置路由标签信息
   * @param state
   * @param commit
   * @param name
   */
  setRouterMetaName({state, commit}, data) {
    commit("SET_ROUTER_META_NAME", data);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
