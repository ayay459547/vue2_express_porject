import Vue from 'vue'

function defaultSetFun(obj, key, value) {
  obj[key] = value
}

function deepClone (targetElement, origin, setFun = Vue.set) {
  let toStr = Object.prototype.toString
  let target = targetElement || {}
  if (!setFun) {
    setFun = defaultSetFun
  }

  for (let prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      switch (toStr.call(target[prop])) {
        case '[object Array]':
          // 如果 target 是 array
          switch (toStr.call(origin[prop])) {
            case '[object Array]':
              target[prop] = []
              deepClone(target[prop], origin[prop])
              break
            case '[object Object]':
              target[prop] = {}
              deepClone(target[prop], origin[prop])
              break
            default:
              setFun(target, prop, origin[prop])
              break
          }
          break
        case '[object Object]':
          // 如果 target 是 object
          switch (toStr.call(origin[prop])) {
            case '[object Array]':
              target[prop] = []
              deepClone(target[prop], origin[prop])
              break
            case '[object Object]':
              target[prop] = {}
              deepClone(target[prop], origin[prop])
              break
            default:
              setFun(target, prop, origin[prop])
              break
          }
          break
        default:
          setFun(target, prop, origin[prop])
          break
      }
    }
  }
  return target
}

export default {
  funName: '$deepClone',
  /**
   * 拷貝 array 或 object
   * @param {Object, Array} targetElement 需要被拷貝的對象
   * @param {Object, Array} origin 拷貝來源
   * @param {Function} setFun
   * @param {Boolean} cover
   * @returns {Object} clone obj
   */
  func: deepClone
}
