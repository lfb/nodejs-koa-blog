import { login, register, info } from '@/request/api/user'
import { setToken } from "@/lib/auth";

const state = () => ({
  userInfo: null,
  isLoginStatus: false
})

const mutations = {
  SET_USERINFO(state, data) {
    state.userInfo = data
  },
  SET_LOGIN_STATUS(state, data) {
    state.isLoginStatus = data
  }
}

const actions = {
  async userLogin({ state, commit }, params = {}) {
    const [err, res] = await login(params)
    if (!err) {
      const user = res.data.data
      commit('SET_USERINFO', {
        id: user.id,
        username: user.username,
        email: user.email
      })
      commit('SET_LOGIN_STATUS', true)
      setToken(user.token)
      return [null, user]
    } else {
      return [err, null]
    }
  },
  async userRegister({ state, commit }, params = {}) {
    const [err, res] = await register(params)
    if (!err) {
      const user = res.data.data
      commit('SET_USERINFO', {
        id: user.id,
        username: user.username,
        email: user.email
      })
      commit('SET_LOGIN_STATUS', true)
      setToken(user.token)
      return [null, user]
    } else {
      return [err, null]
    }

  },
  async userInfo({ state, commit }, params = {}) {
    if (state.isLoginStatus && state.userInfo) {
      return state.userInfo
    }

    const [err, res] = await info(params)
    if (!err) {
      const user = res.data.data
      commit('SET_USERINFO', {
        id: user.id,
        username: user.username,
        email: user.email
      })
      commit('SET_LOGIN_STATUS', true)
      return [null, user]
    } else {
      return [err, null]
    }
  },
}

export default {
  namespace: true,
  state,
  actions,
  mutations
}
