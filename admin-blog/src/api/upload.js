import request from '@/utils/request'

export function getToken(params) {
  return request({
    url: '/upload/token',
    method: 'post',
    params
  })
}
