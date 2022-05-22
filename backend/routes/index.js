const user = require('./store/user')
const menu = require('./store/menu')

const routerList = [
  user,
  menu
]

const isLogin = true

module.exports = function (app, db, sendData) {
  app.use(function (req, res, next) {
    console.log('check')

    if (isLogin) {
      next()
    } else {
      res.send('not login')
    }
  })

  routerList.forEach(route => {
    route(app, db, sendData)
  })

  app.use(function (req, res, next) {
    console.log('can find router')

    res.status(404).send('can find router')
  })
}