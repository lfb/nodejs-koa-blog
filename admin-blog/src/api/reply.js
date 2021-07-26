import request from '@/utils/request'

// 回复列表
export function list(params) {
  return request({
    url: '/reply',
    method: 'get',
    params
  })
}

// 创建回复
export function create(data) {
  return request({
    url: '/reply',
    method: 'post',
    data
  })
}

// 评论详情
export function detail(data) {
  return request({
    url: '/reply/' + data.id,
    method: 'get',
    data
  })
}
// 更新回复
export function update(data) {
  return request({
    url: '/reply/' + data.id,
    method: 'put',
    data
  })
}
// 删除回复
export function detele(data) {
  return request({
    url: '/reply/' + data.id,
    method: 'delete',
    data
  })
}
