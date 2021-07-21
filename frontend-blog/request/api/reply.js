import { POST } from '../http.js'
import reply from '../urls/reply'

export function createReply(data) {
  return POST({
    url: reply.create,
    data
  })
}
