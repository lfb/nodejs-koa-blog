class Resolve {
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

/**
 * 格式化字符串
 * @param str
 * @return {*}
 */
function escapeHtml(str) {
  str = str.replace(/</g, '小于')
  str = str.replace(/>/g, '大于')
  str = str.replace(/\(/g, '括号')
  str = str.replace(/\)/g, '括号')
  str = str.replace(/'/g, '单号')
  str = str.replace(/"/g, '双引号')
  // str = str.replace(/ /g, '空格')
  str = str.replace(/(^\s*)|(\s*$)/g, '');
  return str
}

module.exports = {
  Resolve,
  escapeHtml
}
