function handleResult(msg, errorCode) {
    throw new global.errs.Success(msg, errorCode)
}

module.exports = {
    handleResult
}
