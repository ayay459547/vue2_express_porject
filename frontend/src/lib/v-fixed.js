import Fixer from '@/components/feature/Fixed.vue'
// import { directive } from 'vue-clickaway'

export default {
  install (Vue, { router, store }) {
    // Vue.directive('click-outside', directive)

    const el = document.createElement('div')
    el.style.display = 'none'
    document.body.appendChild(el)

    const $root = {}

    const app = new Vue({
      name: 'Fixer',
      el,
      mixins: [Fixer],
      router,
      store
    })

    Object.defineProperty(Vue.prototype, '$fixer', {
      get () {
        return app
      }
    })
    if ($root) {
      app.$root = $root
    }

    const event = 'mouseenter'
    /**
     * 事件監聽事件
     * @param {Object} options 
     *                 text: 文字內容
     *                 textClass: class 類型(string, object, array)
     *                 textStyle: style 類型(string, object)
     */
    const handler = function (options) {
      const clientRect = this.getBoundingClientRect()

      const type = Object.prototype.toString.call(options)
      switch (type) {
        case '[object Object]':
          options = {
            text: '',
            textClass: null,
            textStyle: null,
            ...options
          }
          break

        case '[object String]':
          options = {
            text: options,
            textClass: null,
            textStyle: null
          }
          break

        default:
          options = {}
          break
      }
      
      app.debounceOpen(
        { 
          left: clientRect.left, 
          top: clientRect.top,
          width: clientRect.width,
          height: clientRect.height
        },
        options
      )
    }

    Vue.directive('fixer', {
      bind (el, { value: options }) {
        el.addEventListener(event, handler.bind(el, options))
      },
      update (el, { value: options }) {
        el.addEventListener(event, handler.bind(el, options))
      }
    })
  }
}