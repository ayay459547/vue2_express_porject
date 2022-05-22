// polyfill
import ArrayPolyfill from './polyfill/Array'

/**
 * 讓 object 有類似 array 的方法
 * https://vanillajstoolkit.com/polyfills/objectforeach/
 */
import objectFunc from './utils/objectFunc'

// util
import mixin from './utils/vueMixin'
import request from './utils/request'
import deepClone from './utils/deepClone'

const funList = [
  request,
  deepClone
]

for (let key in ArrayPolyfill) {
  if (ArrayPolyfill[key].inject && !Array.prototype[key]) {
    Object.defineProperty(Array.prototype, key, {
      get() {
        return ArrayPolyfill[key].func
      },
    })
  }
}

for (let key in objectFunc) {
  if (objectFunc[key].inject && !Object.prototype[key]) {
    Object.defineProperty(Object.prototype, key, {
      get() {
        return objectFunc[key].func
      },
    })
  }
}

// utils
funList.forEach(funItem => {
  let { funName: prop, func } = funItem
  if (!Object.prototype[prop]) {
    Object.defineProperty(Object.prototype, prop, {
      get () {
        return func
      }
    })
  }
})

const pluginLib = {
  install(Vue, options) {
    Vue.mixin(mixin)
    Vue.prototype.$bus = new Vue()
  }
}

export default pluginLib
