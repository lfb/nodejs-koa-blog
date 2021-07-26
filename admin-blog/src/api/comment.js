import request from '@/utils/request'

// 获取评论列表
export function list(params) {
  return request({
    url: '/comment',
    method: 'get',
    params
  })
}

// 创建评论
export function create(data) {
  return request({
    url: '/comment',
    method: 'post',
    data
  })
}

// 评论详情
export function detail(data) {
  return request({
    url: '/comment/' + data.id,
    method: 'get',
    data
  })
}

// 更新详情
export function update(data) {
  return request({
    url: '/comment/' + data.id,
    method: 'put',
    data
  })
}

// 删除评论
export function detele(data) {
  return request({
    url: '/comment/' + data.id,
    method: 'delete',
    data
  })
}
