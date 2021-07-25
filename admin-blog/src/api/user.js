import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete/' + data.id,
    method: 'delete',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update/' + data.id,
    method: 'put',
    data
  })
}

export function userInfo(data) {
  return request({
    url: '/user/detail/' + data.id,
    method: 'get',
    data
  })
}
