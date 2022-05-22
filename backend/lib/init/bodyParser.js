const bodyParser = require('body-parser')

module.exports = function initCorsOptions(app) {
  app.use(bodyParser.urlencoded({ extended : true }))
  app.use(bodyParser.json())
}