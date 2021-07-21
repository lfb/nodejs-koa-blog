import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/article',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/article/' + data.id,
    method: 'get',
    data
  })
}
export function update(data) {
  return request({
    url: '/article/' + data.id,
    method: 'put',
    data
  })
}

export function detele(data) {
  return request({
    url: '/article/' + data.id,
    method: 'delete',
    data
  })
}
