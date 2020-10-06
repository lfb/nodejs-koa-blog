window.onload = function () {
  /**
   * 事件的节流（throttle）与防抖（debounce）
   * @param fn 是我们需要包装的事件回调
   * @param delay 是时间间隔的阈值
   * @return {Function}
   */
  function throttle(fn, delay) {
    // last为上一次触发回调的时间, timer是定时器
    let last = 0, timer = null
    // 将throttle处理结果当作函数返回

    return function () {
      // 保留调用时的this上下文
      let context = this
      // 保留调用时传入的参数
      let args = arguments
      // 记录本次触发回调的时间
      let now = +new Date()

      // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
      if (now - last < delay) {
        // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
        clearTimeout(timer)
        timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, delay)
      } else {
        // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
        last = now
        fn.apply(context, args)
      }
    }
  }

  // 获取所有的图片标签
  const imgs = document.getElementsByClassName('article-list-cover-img')
  // 获取可视区域的高度
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  // num 用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
  let num = 0

  /**
   * 图片懒加载
   */
  function imgLazyLoad() {
    for (let i = num; i < imgs.length; i++) {
      // 用可视区域高度减去元素顶部距离可视区域顶部的高度
      let distance = viewHeight - imgs[i].getBoundingClientRect().top
      // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
      if (distance >= 0) {
        // 给元素写入真实的src，展示图片
        imgs[i].src = imgs[i].getAttribute('data-src')
        // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
        num = i + 1
      }
    }
  }

  imgLazyLoad()
  // 用新的throttle包装scroll的回调
  const betterScroll = throttle(imgLazyLoad, 1000)
  document.addEventListener('scroll', betterScroll)
}
