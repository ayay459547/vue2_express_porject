const { clearCookie } = require('../../lib/utils/cookie')

module.exports = function (app, db, sendData) {

  app.post('/views/logout', async (req, res) => {

    clearCookie(res, 'statusData')

    res.send(sendData)
  })
}