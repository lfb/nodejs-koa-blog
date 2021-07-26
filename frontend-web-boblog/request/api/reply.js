import { POST } from '../http.js'
import reply from '../urls/reply'

// 创建回复
export function createReply(data) {
  return POST({
    url: reply.create,
    data
  })
}
