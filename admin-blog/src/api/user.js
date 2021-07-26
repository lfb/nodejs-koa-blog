import request from '@/utils/request'

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}
// 获取删除用户
export function deleteUser(data) {
  return request({
    url: '/user/delete/' + data.id,
    method: 'delete',
    data
  })
}

// 更新用户信息
export function updateUser(data) {
  return request({
    url: '/user/update/' + data.id,
    method: 'put',
    data
  })
}

// 获取用户信息
export function userInfo(data) {
  return request({
    url: '/user/detail/' + data.id,
    method: 'get',
    data
  })
}
