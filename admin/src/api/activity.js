import fetch from './fetch';

export default {
    // 添加
    store(data) {
        return fetch.post('/admin/activity', data)
    },

    // 编辑
    update(data, id) {
        let params = Object.assign({}, {_method: 'PUT'}, data)

        return fetch.post('/admin/activity/' + id, params)
    },

    // 查询列表
    getList(query) {
        return fetch.get('/admin/activity', query)
    },

    // 查询详情
    show(id, query) {
        return fetch.get('/admin/activity/' + id, query)
    },

    // 删除
    delete(id) {
        return fetch.post('/admin/activity/' + id, {_method: 'DELETE'})
    }

}
