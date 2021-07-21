import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/reply',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/reply',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/reply/' + data.id,
    method: 'get',
    data
  })
}
export function update(data) {
  return request({
    url: '/reply/' + data.id,
    method: 'put',
    data
  })
}

export function detele(data) {
  return request({
    url: '/reply/' + data.id,
    method: 'delete',
    data
  })
}
