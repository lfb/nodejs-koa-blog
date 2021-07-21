import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/comment',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/comment',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/comment/' + data.id,
    method: 'get',
    data
  })
}
export function update(data) {
  return request({
    url: '/comment/' + data.id,
    method: 'put',
    data
  })
}

export function detele(data) {
  return request({
    url: '/comment/' + data.id,
    method: 'delete',
    data
  })
}
