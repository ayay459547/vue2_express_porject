const { userData } = require('./FakeData')

module.exports = function (app, db, sendData) {
  app.post('/store/user', (req, res) => {
    console.log(req.body)

    sendData.data = userData
    res.send(sendData)
  })
}