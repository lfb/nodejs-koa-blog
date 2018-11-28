import user from '../../api/user'

const state = {
  userInfo: null
};

const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  }
}

const actions = {
  /**
   * 用户登录
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async userLogin({state, commit}, params) {
    const ret = await user.login(params);
    return ret.data.data;
  },

  /**
   * 用户注册
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async userRegister({state, commit}, params) {
    return await user.register(params);
  },

  /**
   * 用户列表
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async userList({state, commit}, params) {
    return await user.list(params);
  },

  /**
   * 删除用户
   * @param state
   * @param commit
   * @param id
   * @return {Promise<void>}
   */
  async deleteUser({state, commit}, id) {
    return await user.delete(id);
  },

  /**
   * 用户信息
   * @param state
   * @param commit
   * @param id
   * @return {Promise<void>}
   */
  async getUserInfo({state, commit}) {
    if (state.userInfo) {
      return state.userInfo;

    } else {
      const ret = await user.info();
      commit('SET_USER_INFO', ret.data.data);

      return ret.data.data;
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
