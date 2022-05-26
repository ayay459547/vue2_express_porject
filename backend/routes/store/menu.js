// const { menuData } = require('./FakeData')

module.exports = function (app, db, sendData) {
  app.post('/store/menu', (req, res) => {
    console.log(req.body)
    
    sendData.data = []
    res.send(sendData)
  })
}