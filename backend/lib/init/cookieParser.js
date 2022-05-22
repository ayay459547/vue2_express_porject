const cookieParser = require('cookie-parser')

const key = '!@#$VU<%P%)0304'

module.exports = function initCookieParser(app) {
  app.use(cookieParser(key))
}