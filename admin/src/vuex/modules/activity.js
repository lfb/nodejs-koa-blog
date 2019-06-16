import activity  from '../../api/activity'
import * as types from '../mutation-types'

const state = {
  list: [],
  page: {},
  detail: {},
}

const mutations = {

  [types.SET_ACTIVITY_LIST](state, data) {
    state.list = data.data
    state.page = data.meta.pagination
  },

  [types.SET_ACTIVITY_DETAIL](state, data) {
    state.detail = data
  },

  [types.CHANGE_ACTIVITY_LIST] (state, payload) {
    if (payload.action === 'update') {
      let obj = state.list.find((i) => i.id === payload.data.id)
      Object.assign(obj, payload.data)
    } else if (payload.action === 'delete') {
      state.list = state.list.filter(t => t.id != payload.data.id)
    }
  },

}

const actions = {

  /**
   * 获取列表
   * @param rootState
   * @param commit
   * @returns {Promise}
   */
  getActivityList({rootState, commit}, query = {}) {
    let data = Object.assign(query, rootState.route.query)
    data.sort = "created_at"
    data.dir = "desc"

    return new Promise((resolve, reject) => {
      activity.getList(data).then(ret => {
        commit(types.SET_ACTIVITY_LIST, ret.data)

        resolve(ret)

      }).catch(ret => {
        reject(ret)

      })

    })

  },

  /**
   * 获取详情
   * @param commit
   * @param id
   * @returns {Promise}
   */
  getActivityDetail({commit}, data) {
    return new Promise((resolve, reject) => {
      var id = null;
      var query = {};
      if (typeof data == 'object') {
        id = data.id;
        query = data.query;
      } else {
        id = data;
      }
      activity.show(id, query).then(ret => {
        var data = ret.data.data;

        commit(types.SET_ACTIVITY_DETAIL, data)
        resolve(ret)

      }).catch(ret => {
        reject(ret)

      })

    })
  },



}

export default {
  state,
  actions,
  mutations
}
