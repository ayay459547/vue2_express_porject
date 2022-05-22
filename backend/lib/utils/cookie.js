/**
 * 設置 cookie
 * @param {*} res 
 * @param {String} sKey 
 * @param {String} sValue 
 * @param {Object} options
 *  options 說明:
 *  expires(秒), ex: new Date(Date.now() + 900000)
 *  maxAge(毫秒), ex: 900000
 *  secrue(true時 只在HTTPS有效), 
 *  path(路徑 要匹配到才有用),
 *  domin(路徑)
 *  httpOnly(防XSS 無法通過js腳本 applet等取得cookie 訊息)
 *  signed(true時 為簽名cookie 需用res.signedCookies使用 被竄改時會被服務器拒絕 且重置cookie)
 */
function setCookie (res, sKey, sValue, options) {
  res.cookie(sKey, sValue, options)
}

/**
 * 取的 cookie
 * @param {*} req 
 * @param {String} sKey 
 * @param {Boolean} signed
 * @returns 
 */
function getCookie (req, sKey, signed = false) {
  if (signed) {
    return req.signedCookies[sKey]
  } else {
    return req.cookies[sKey]
  }
}

module.exports = {
  setCookie,
  getCookie
}