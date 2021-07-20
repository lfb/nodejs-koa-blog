import { GET } from '../http.js'
import article from '../urls/article'

export function getArticleDetail(data) {
    return GET({
      url: article.detail + '/' + data.id,
      data
    })
}
export function getArticleList(data) {
    return GET({ url: article.list, data })
}
