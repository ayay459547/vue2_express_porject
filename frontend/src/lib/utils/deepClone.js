import Vue from 'vue'

function defaultSetFun(obj, key, value) {
  obj[key] = value
}

export default {
  funName: '$deepClone',
  /**
   * 拷貝 array 或 object
   * @param {Object, Array} targetElement
   * @param {Object, Array} origin
   * @param {Function} setFun
   * @param {Boolean} cover
   * @returns {Object} clone obj
   */
  func (targetElement, origin, setFun = Vue.set) {
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
                target[prop].push([])
                deepclone(target[prop], origin[prop])
                break
              case '[object Object]':
                target[prop].push({})
                deepclone(target[prop], origin[prop])
                break
              default:
                target[prop].push(origin[prop])
                // setFun(target, prop, origin[prop])
                break
            }
            break
          case '[object Object]':
            // 如果 target 是 object
            switch (toStr.call(origin[prop])) {
              case '[object Array]':
                target[prop] = []
                deepclone(target[prop], origin[prop])
                break
              case '[object Object]':
                target[prop] = {}
                deepclone(target[prop], origin[prop])
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
  },
}
