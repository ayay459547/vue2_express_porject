const cors = require('cors')

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://192.168.1.9:8080'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}

module.exports = function initCorsOptions(app) {
  app.use(cors(corsOptions))
}