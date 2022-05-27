// const { menuData } = require('./FakeData')
const { getCookie } = require('../../lib/utils/cookie')

module.exports = function (app, db, sendData) {
  app.get('/store/menu', (req, res) => {
    let statusData = null
    try {
      statusData = getCookie(req, 'statusData')

    } catch (e) {
      console.log(e)
      res.send(errorData)

    } finally {
      if (![null, undefined].includes(statusData)) {
        let { menuData } = JSON.parse(statusData)
        sendData.data = menuData
      }
      res.send(sendData)
    }
  })
}