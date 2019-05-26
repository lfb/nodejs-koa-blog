import user from '../../api/user'

const state = {
  userInfo: null,
  showUserManagerModel: false
};

const mutations = {
  // 设置用户信息
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  // 显示用户登录注册模态框
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
  // 获取用户信息
  async getUserInfo({state, commit}, params) {
    const userInfo = await user.info(params);

    commit('SET_USER_INFO', userInfo.data.data);

    return userInfo;
  },
  // 显示用户登录注册模态框
  showUserManager({state, commit}, isShow) {
    commit('SHOW_USER_MANAGER_MODEL', isShow)
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
