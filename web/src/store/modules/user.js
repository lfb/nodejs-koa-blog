import user from '../../api/user'

const state = {
  showUserManagerModel: false
};

const mutations = {
  SHOW_USER_MANAGER_MODEL(state, isShow) {
    state.showUserManagerModel = isShow;
  }
};

const actions = {
  // 用户注册
  async userRegister({state, commit}, params) {
    return user.register(params);
  },
  // 用户登录
  async userLogin({state, commit}, params) {
    return user.login(params);
  },
  // 显示用户登录注册模态框
  showUserManager({state, commit}, isShow){
    commit('SHOW_USER_MANAGER_MODEL', isShow)
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
