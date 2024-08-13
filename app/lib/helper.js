class Resolve {
    fail(err = {}, msg = '操作失败', errorCode = 10001) {
        return {
            msg,
            err,
            errorCode
        }
    }

    success(msg = 'success', errorCode = 0, code = 200) {
        return {
            msg,
            code,
            errorCode
        }
    }

    json(data, msg = 'success', errorCode = 0, code = 200) {
        return {
            code,
            msg,
            errorCode,
            data
        }
    }
}

module.exports = {
    Resolve
}
