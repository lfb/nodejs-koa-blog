module.exports = {
    bh: {
        attributes: {
            exclude: ['password', 'updated_at', 'deleted_at', 'created_at']
        }
    },
    iv: {
        attributes: {
            exclude: ['content', 'content_html', 'password', 'updated_at', 'deleted_at']
        }
    },
    content: {
        attributes: {
            exclude: ['content_html', 'password', 'deleted_at']
        }
    },
    html: {
        attributes: {
            exclude: ['content', 'password', 'deleted_at']
        }
    }
}
