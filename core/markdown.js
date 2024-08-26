const fs = require('fs')
const path = require('path')

const hljs = require('highlight.js')
const { isArray, isObject } = require('@core/util')

// 文章Markdown文件
const ARTICLE_DIR = '../doc/articles/'
// 备份文章文件
const ARTICLE_BACKUPS_DIR = '../doc/backups'
// 文章Markdown文件后缀
const ARTICLE_MARKDOWN_FILE_EXT = '.md'

// 处理文章元信息
const handleArticleMetaInfo = data => `
---

admin_id: ${data.admin_id}
title: ${data.title}
status: ${data.status}
category_id: ${data.category_id}
article_path: ${data.article_path}
description: ${data.description}
img_url: ${data.img_url}
seo_keyword: ${data.seo_keyword}
sort_order: ${data.sort_order}

---

${data.content}
`

// 处理文章路径
const handleArticlePath = paths => {
    if (paths && typeof paths === 'string') {
        // 去掉开头的 /
        if (paths.split('/')[0] === '/') {
            paths = paths.substring(1)
        }

        return paths.split('/').join('-').split(' ').join('-')
    }
}

// 检查是否需要删除旧文件
const checkSameFile = (id, articleFileName) => {
    try {
        const articleDir = path.join(__dirname, ARTICLE_DIR)
        const files = fs.readdirSync(articleDir)

        let removeFilesArray = []

        for (let file of files) {
            let fileId = file.split('-')[0]
            // 如果文件名与 id 相同，且全文件名不一样
            let isSameFile = file !== articleFileName && parseInt(fileId, 10) === parseInt(id, 10)
            if (isSameFile) {
                removeFilesArray.push(path.join(__dirname, ARTICLE_DIR, file))
            }
        }

        return removeFilesArray
    } catch (err) {
        console.error('Error reading directory:', err)
    }
}

// 移除旧文件备份
const removeFile = file => {
    const destinationPath = path.join(__dirname, ARTICLE_BACKUPS_DIR)

    fs.mkdir(destinationPath, { recursive: true }, err => {
        if (err) throw err

        // 移动文件
        const targetFilePath = path.join(__dirname, ARTICLE_BACKUPS_DIR, file)
        const sourcePath = path.join(__dirname, ARTICLE_DIR, file)

        fs.rename(sourcePath, targetFilePath, err => {
            if (err) throw err

            console.log('文件移动成功')
        })
    })
}

// 删除旧文件
const handleDeleteFile = removeFilesArray => {
    // 移除/备份旧文件
    if (isArray(removeFilesArray)) {
        removeFilesArray.forEach(file => {
            try {
                fs.unlinkSync(file)
            } catch (e) {
                console.error(`unlinkSync ${file} failed!`)
            }
        })
    }
}

// markdown 配置
const markdownIt = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre class="hljs"><code>' +
                    // https://github.com/highlightjs/highlight.js/issues/2277
                    hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true
                    }).value +
                    '</code></pre>'
                )
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + markdownIt.utils.escapeHtml(str) + '</code></pre>'
    }
})

/**
 * 生成 markdown 文件
 *
 * @param data 文章的详情数据
 */
const handleMarkdownFile = data => {
    if (!isObject(data)) return

    const articleId = data.id
    const articleFileName = articleId + '-' + handleArticlePath(data.article_path) + ARTICLE_MARKDOWN_FILE_EXT

    // 检查是否需要删除旧文件
    const removeFilesArray = checkSameFile(articleId, articleFileName) || []

    // 生成文件路径
    const articlePath = path.join(__dirname, ARTICLE_DIR, articleFileName)

    fs.mkdir(path.join(__dirname, ARTICLE_DIR), { recursive: true }, err => {
        if (err) throw err

        // 写入文章信息内容文件
        fs.writeFile(articlePath, handleArticleMetaInfo(data), err => {
            if (err) {
                console.error('Error writing file:', err)
            } else {
                handleDeleteFile(removeFilesArray)
            }
        })
    })
}

module.exports = {
    markdownIt,
    handleMarkdownFile
}
