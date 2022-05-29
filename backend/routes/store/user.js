// const { userData } = require('./FakeData')
const { getCookie } = require('../../lib/utils/cookie')

module.exports = function (app, db, sendData, errorData) {
  app.get('/store/user', async (req, res) => {
    let statusData = null
    try {
      statusData = getCookie(req, 'statusData')

    } catch (e) {
      console.log(e)
      res.send(errorData)

    } finally {
      if (![null, undefined].includes(statusData)) {
        let { userData } = JSON.parse(statusData)
        sendData.data = userData
      } else {
        sendData.data = {
          id: null,
          name: null
        }
      }
      
      res.send(sendData)
    }
  })
}