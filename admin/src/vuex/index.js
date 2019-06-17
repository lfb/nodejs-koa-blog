import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import app from './app'
import admin from './modules/admin'
import category from './modules/category'
import comments from './modules/comments'
import article from './modules/article'

Vue.use(Vuex);

const state = {
  main_loading: false,
  picture_modal: {
    picture: null,
    modal: false
  },
}

const mutations = {
  /**
   * 修改loading状态
   * @param state
   * @param data
   */
  [types.SET_MAIN_LOADING](state, data) {
    state.main_loading = data
  },

  /**
   * 图集显示
   * @param state
   * @param data
   */
  [types.SET_PICTURE_MODAL](state, data) {
    state.picture_modal = data
  }

}

const actions = {
  setMainLoading({commit}, data) {
    commit(types.SET_MAIN_LOADING, data)
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    app,
    admin,
    article,
    comments,
    category
  },
});
