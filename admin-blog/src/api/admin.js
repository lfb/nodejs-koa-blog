import request from '@/utils/request'

// 管理员登录
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 获取管理员信息
export function getInfo() {
  return request({
    url: '/admin/auth',
    method: 'get'
  })
}

