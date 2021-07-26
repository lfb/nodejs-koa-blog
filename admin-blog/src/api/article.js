import request from '@/utils/request'

// 获取文章列表
export function list(params) {
  return request({
    url: '/article',
    method: 'get',
    params
  })
}
// 创建文章
export function create(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}
// 获取文章详情
export function detail(data) {
  return request({
    url: '/article/' + data.id,
    method: 'get',
    data
  })
}

// 更新文章
export function update(data) {
  return request({
    url: '/article/' + data.id,
    method: 'put',
    data
  })
}

// 删除文章
export function detele(data) {
  return request({
    url: '/article/' + data.id,
    method: 'delete',
    data
  })
}
