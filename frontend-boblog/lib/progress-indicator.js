(function() {
  const root = (typeof self === 'object' && self.self === self && self) ||
    (typeof global === 'object' && global.global === global && global) ||
    this || {};

  // 兼容处理
  let lastTime = 0;
  const vendors = ['webkit', 'moz'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      const id = window.setTimeout(function() {
        // eslint-disable-next-line node/no-callback-literal
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  const util = {
    extend(target) {
      for (let i = 1, len = arguments.length; i < len; i++) {
        for (const prop in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], prop)) {
            target[prop] = arguments[i][prop]
          }
        }
      }

      return target
    },
    getViewPortSizeHeight() {
      const w = window;
      if (w.innerWidth != null) return w.innerHeight;
      const d = w.document;
      // 表明是标准模式
      if (document.compatMode === "CSS1Compat") {
        return d.documentElement.clientHeight;
      }
      // 怪异模式
      return d.body.clientHeight;
    },
    getScrollOffsetsTop() {
      const w = window;
      if (w.pageXOffset != null) return w.pageYOffset;
      const d = w.document;
      // 表明是标准模式
      if (document.compatMode === "CSS1Compat") {
        return d.documentElement.scrollTop;
      }
      // 怪异模式
      return d.body.scrollTop;
    },
    addEvent(element, type, fn) {
      if (document.addEventListener) {
        element.addEventListener(type, fn, false);
        return fn;
      } else if (document.attachEvent) {
        const bound = function() {
          return fn.apply(element, arguments)
        }
        element.attachEvent('on' + type, bound);
        return bound;
      }
    },
    isValidListener(listener) {
      if (typeof listener === 'function') {
        return true
      } else if (listener && typeof listener === 'object') {
        return util.isValidListener(listener.listener)
      } else {
        return false
      }
    },
    indexOf(array, item) {
      if (array.indexOf) {
        return array.indexOf(item);
      }
      else {
        let result = -1;
        for (let i = 0, len = array.length; i < len; i++) {
          if (array[i] === item) {
            result = i;
            break;
          }
        }
        return result;
      }
    },
    // 移除事件
    removeEvent (element, type, fn) {
      if (document.removeEventListener) {
        element.removeEventListener(type, fn, false);
        return fn;
      } else if (document.attachEvent) {
        const bound = function () {
          return fn.apply(element, arguments)
        }
        element.detachEvent('on' + type, bound);
        return bound;
      }
    },
    // 是否为id选择器
    isIdSelector(selector) {
      return selector.includes('#')
    },
    // 是否为类选择器
    isClassSelector(selector) {
      return selector.includes('.')
    },
    // 获取元素
    getEle(selector) {
      const doc = document
      let dom = null

      if (doc.querySelector) {
        dom = doc.querySelector(selector)
      }

      if (!dom && util.isIdSelector(selector)) {
        const ids = selector.split('#')[1]
        dom = doc.getElementById(ids)
      }

      if (!dom && util.isClassSelector(selector)) {
        const cls = selector.split('.')[1]
        const selectDom = doc.getElementsByClassName(cls)
        dom = selectDom ? selectDom[0] : null
      }

      return dom
    },
    // 移除DOM元素
    removeDom (selector) {
      if (selector && typeof selector === 'string') {
        const dom = util.getEle(selector)
        dom && dom.parentNode && dom.parentNode.removeChild(dom)
      }
    },
    isFunction(fn) {
      return typeof fn === 'function'
    }
  };

  function EventEmitter() {
    this.__events = {}
  }

  EventEmitter.prototype.on = function(eventName, listener) {
    if (!eventName || !listener) return;

    if (!util.isValidListener(listener)) {
      throw new TypeError('listener must be a function');
    }

    const events = this.__events;
    const listeners = events[eventName] = events[eventName] || [];
    const listenerIsWrapped = typeof listener === 'object';

    // 不重复添加事件
    if (!util.includes(listeners, listener)) {
      listeners.push(listenerIsWrapped ? listener : {
        listener,
        once: false
      });
    }

    return this;
  };
  EventEmitter.prototype.once = function(eventName, listener) {
    return this.on(eventName, {
      listener,
      once: true
    })
  };
  EventEmitter.prototype.off = function(eventName, listener) {
    const listeners = this.__events[eventName];
    if (!listeners) return;

    let index;
    for (let i = 0, len = listeners.length; i < len; i++) {
      if (listeners[i] && listeners[i].listener === listener) {
        index = i;
        break;
      }
    }

    if (typeof index !== 'undefined') {
      listeners.splice(index, 1, null)
    }

    return this;
  };
  EventEmitter.prototype.emit = function(eventName, args) {
    const listeners = this.__events[eventName];
    if (!listeners) return;

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      if (listener) {
        listener.listener.apply(this, args || []);
        if (listener.once) {
          this.off(eventName, listener.listener)
        }
      }

    }

    return this;

  };

  function ProgressIndicator(options) {

    this.options = util.extend({}, this.constructor.defaultOptions, options)

    this.handlers = {};

    this.init();
  }

  ProgressIndicator.VERSION = '1.0.0';

  ProgressIndicator.defaultOptions = {
    color: "#0A74DA"
  }

  const proto = ProgressIndicator.prototype = new EventEmitter();

  proto.constructor = ProgressIndicator;

  proto.init = function() {
    this.createIndicator();
    const width = this.calculateWidthPrecent();
    this.setWidth(width);
    this.bindScrollEvent();

  }

  proto.createIndicator = function() {
    const div = document.createElement("div")

    div.id = "progress-indicator";
    div.className = "progress-indicator";

    // div.style.position = "fixed"
    // div.style.top = 0;
    // div.style.left = 0;
    // div.style.height = '3px';
    // div.style.backgroundColor = this.options.color;

    this.element = div;

    document.body.appendChild(div);
  }

  proto.calculateWidthPrecent = function() {
    // 文档高度
    this.docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)

    // 视口高度
    this.viewPortHeight = util.getViewPortSizeHeight();
    // 差值
    this.sHeight = Math.max(this.docHeight - this.viewPortHeight, 0);
    // 滚动条垂直偏移量
    const scrollTop = util.getScrollOffsetsTop();

    return this.sHeight ? scrollTop / this.sHeight : 0;
  }

  proto.setWidth = function(perc) {
    this.element.style.width = perc * 100 + "%";
  }

  proto.bindScrollEvent = function() {
    const self = this;
    let prev;

    this.scrollHandler = function () {
      window.requestAnimationFrame(function () {
        const perc = Math.min(util.getScrollOffsetsTop() / self.sHeight, 1);
        // 火狐中有可能连续计算为 1，导致 end 事件被触发两次
        if (perc === prev) return;
        // 在达到 100% 的时候，刷新页面不 emit end 事件
        if (prev && perc === 1) {
          self.emit("end")
        }

        prev = perc;
        self.setWidth(perc);
      });
    }

    util.addEvent(window, "scroll", this.scrollHandler)
  }

  // 移除进度条
  proto.removeProgress = function (fn) {
    if (util.isFunction(this.scrollHandler)) {
      util.removeEvent(window, "scroll", this.scrollHandler)
      util.removeDom("#progress-indicator")

      // 回调函数
      util.isFunction(fn) && fn()
    }
  }

  if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = ProgressIndicator;
    }
    exports.ProgressIndicator = ProgressIndicator;
  } else {
    root.ProgressIndicator = ProgressIndicator;
  }

}());
