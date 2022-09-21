/**
 * 防抖函數
 * @param {*} callback 回調函數
 * @param {*} delay 延遲
 * @returns 
 */
export const debounce = (callback, delay) => {
  let now = null
  let timeoutId = null

  return new Proxy(() => {}, {
    apply (obj, thisArg, params) {
      now = +new Date()

      if (timeoutId) { clearInterval(timeoutId) }

      timeoutId = setTimeout(() => {
        lastTime = now
        callback.call(thisArg, ...params)
      }, delay)
    }
  })
}