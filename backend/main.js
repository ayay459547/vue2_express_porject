const express = require('express')
const app = express()

function initApp (initList) {
  initList.forEach(callback => {
    callback(app)
  })
}

// 解析body資料
const initBodyParser = require('./lib/init/bodyParser')
// 跨域設定
const initCorsOptions = require('./lib/init/corsOptions')
// 使用 cookie
const initCookieParser = require('./lib/init/cookieParser')

initApp([
  initBodyParser,
  initCorsOptions,
  initCookieParser,
])

const port = 8090

const db = require('./lib/db')

const sendData = {
  data: 'empty',
  status: 'success',
  msg: '成功'
}

const errorData = {
  data: 'empty',
  status: 'error',
  msg: '失敗'
}

require('./routes')(app, db, sendData, errorData)

app.listen(port, () => {
   console.log( 'success run server on ' + port)
})