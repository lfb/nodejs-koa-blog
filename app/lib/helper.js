class Resolve {
    success(msg = 'success', errorCode = 0) {
        return {
            msg,
            errorCode
        }
    }

    json(data, msg = 'success', errorCode = 0) {
        return {
            msg,
            errorCode,
            data
        }
    }
}

module.exports = {
    Resolve
}
