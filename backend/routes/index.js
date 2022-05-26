const login = require('./views/login')
const user = require('./store/user')
const menu = require('./store/menu')

const routerList = [
  user,
  menu
]

const isLogin = true

module.exports = function (app, db, sendData, errorData) {
  login(app, db, sendData, errorData)

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