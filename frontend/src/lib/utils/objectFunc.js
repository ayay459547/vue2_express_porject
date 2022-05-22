const objectFunc = {
  $forEach: {
    inject: true,
    fun (callback, thisArg) {
      thisArg = thisArg || window

      for (let key in this) {
        if (this.hasOwnProperty(key)) {
          callback.call(thisArg, this[key], key, this)
        }
      }

      return this
    } 
  },
  $map: {
    inject: true,
    fun (callback, thisArg) {
      thisArg = thisArg || window

      let resObj = new this.constructor()
      for (let key in this) {
        if (this.hasOwnProperty(key)) {
          resObj[key] = callback.call(thisArg, this[key], key, this)
        }
      }
      return resObj
    } 
  },
  $filter: {
    inject: true,
    fun (callback, thisArg) {
      thisArg = thisArg || window

      let resObj = new this.constructor()
      for (let key in this) {
        if (this.hasOwnProperty(key) && callback.call(thisArg, this[key], key, this)) {
          resObj[key] = this[key]
        }
      }
      return resObj
    } 
  },
  $some: {
    inject: true,
    fun (callback, thisArg) {
      thisArg = thisArg || window
      for (let key in this) {
        if (this.hasOwnProperty(key) && callback.call(thisArg, this[key], key, this)) {
          return true
        }
      }
      return false
    } 
  },
  $every: {
    inject: true,
    fun (callback, thisArg) {
      thisArg = thisArg || window
      for (let key in this) {
        if (this.hasOwnProperty(key) && !callback.call(thisArg, this[key], key, this)) {
          return false
        }
      }
      return true
    } 
  },
  $reduce: {
    inject: true,
    fun (callback, temp, thisArg) {
      thisArg = thisArg || window
      for (let key in this) {
        if (this.hasOwnProperty(key)) {
          temp = callback.call(thisArg, temp, this[key], key)
        }
      }
      return temp
    } 
  }
}

export default objectFunc
