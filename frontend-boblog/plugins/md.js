import Vue from 'vue'
const hljs = require('highlight.js')

const md = require('markdown-it')({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, {
            language: lang,
            ignoreIllegals: true,
          }).value +
          '</code></pre>'
        )
      } catch (__) { }
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    )
  },
})

Vue.prototype.$md = md;
export default md;
