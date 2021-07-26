import { GET, POST } from '../http.js'
import comment from '../urls/comment'

export function createComment(data) {
  return POST({
    url: comment.create,
    data
  })
}
export function getCommentTarget(params) {
  return GET({
    url: comment.target,
    params
  })
}
