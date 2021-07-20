import { GET } from '../http.js'
import article from '../urls/article'

export function getArticleDetail(params) {
    return GET({
      url: article.detail + '/' + params.id,
      params
    })
}
export function getArticleList(data) {
    return GET({ url: article.list, data })
}
