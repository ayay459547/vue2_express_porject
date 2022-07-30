import moment from 'moment'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const mixin = {
  data() {
    return {
      moment
    }
  },
  methods: {
    /**
     * 判斷東西是否有值
     * @param {*} value
     * @param {String} type 類型
     * @param {Boolean} log 是否 console.log 資料
     * @returns {Boolean}
     */
    isSet(value, type = '', log = false) {
      if (log) {
        console.log(value)
      }

      if ([null, undefined].includes(value)) return false

      switch (type) {
        case 'array':
        case 'Array':
        case 'string':
        case 'String':
          if (value.length > 0) return true
          return false
        case 'object':
        case 'Object':
          const hasOwnProperty = Object.hasOwnProperty
          for (let key in value) {
            if (hasOwnProperty.call(value, key)) return true
          }
          return false
        case 'number':
        case 'Number':
          if (!isNaN(parseInt(value))) return true
          return false
      }

      return true
    },
    /**
     * 判斷東西是否為空
     * @param {*} value
     * @param {String} type
     * @returns {Boolean}
     */
    isEmpty(value, type = '') {
      if ([null, undefined].includes(value)) return true

      switch (type) {
        case 'array':
        case 'Array':
        case 'string':
        case 'String':
          if (value.length > 0) return false
          return true
        case 'object':
        case 'Object':
          const hasOwnProperty = Object.hasOwnProperty
          for (let key in value) {
            if (hasOwnProperty.call(value, key)) return false
          }
          return true
        case 'number':
        case 'Number':
          if (!isNaN(parseInt(value))) return false
          return true
      }

      return false
    },
    /**
     * alart
     * @param {Object} options
     */
    swal(options) {
      Swal.fire({
        ...options,
      })
    },
    /**
     * 待補
     * 類似php Array_map
     */
    Object_map(object, callback, type) {

    },
    /**
     * 顯示資料
     * @param {*} any
     * @return {*}
     */
    logAny (any) {
      console.log(any)
      return any
    }
  },
}

export default mixin
