const test = require('./test')

const login = require('./views/login')
const logout = require('./views/logout')
const status = require('./views/status')

const user = require('./store/user')
const menu = require('./store/menu')
const options = require('./store/options')

const users = require('./menu/users')

const routerList = [
  // store
  user,
  menu,
  options,
  // menu
  users
]

const isLogin = true

module.exports = function (app, db, sendData, errorData) {
  // 測試用
  // http://localhost:5050/test
  // http://192.168.1.XXX:5050/test
  test(app, db, sendData, errorData)

  login(app, db, sendData, errorData)
  logout(app, db, sendData, errorData)
  status(app, db, sendData, errorData)

  app.use(function (req, res, next) {
    if (isLogin) {
      next()
    } else {

      errorData.data = 'not login'
      res.send(errorData)
    }
  })

  routerList.forEach(route => {
    route(app, db, sendData, errorData)
  })

  app.use(function (req, res, next) {
    errorData.data = `cann't find router`
    res.status(404).send(errorData)
  })
}