window.onload = function () {
  /**
   * 监听搜索表单
   */
  document.getElementById('search-input').addEventListener('keydown', function (event) {
    var e = event || event.event;
    if (e && e.keyCode === 13) {
      var value = document.getElementById('search-input').value
      if (escapeHtml(value)) {
        console.log()
        window.location.replace(`/?keyword=${escapeHtml(value)}`)
      }
    }
  })

  // document.getElementsByTagName('table')[0].setAttribute('border', 1)
  // document.getElementsByTagName('table')[0].setAttribute('cellspacing', 0)

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
}
