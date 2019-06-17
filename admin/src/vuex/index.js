import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import app from './app'
import upload from '../api/qiniu'
import admin from './modules/admin'
import qiniu from './modules/qiniu'
import category from './modules/category'
import comments from './modules/comments'
import activity from './modules/activity'
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
  },
  setPictureModal({commit}, data) {
    commit(types.SET_PICTURE_MODAL, data)
  },
  getUploadToken({commit}) {
    return new Promise((resolve, reject) => {
      let uploadToken = Vue.ls.get('uploadToken')
      let uploadUrl = Vue.ls.get('uploadUrl')
      if (!uploadToken) {
        upload.getToken().then(ret => {
          uploadToken = ret.data.data.token
          uploadUrl = ret.data.data.url
          Vue.ls.set('uploadToken', uploadToken, 3000 * 1000)
          Vue.ls.set('uploadUrl', uploadUrl, 3000 * 1000)
          resolve({token: uploadToken, url: uploadUrl})
        }).catch(err => {
          reject()
        })
      } else {
        resolve({token: uploadToken, url: uploadUrl})
      }

    })
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    app,
    qiniu,
    admin,
    activity,
    article,
    comments,
    category
  },
});
