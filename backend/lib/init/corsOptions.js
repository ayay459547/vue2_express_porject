const cors = require('cors')

const corsOptions = {
  origin: [
    'http://localhost:5000',
    'http://192.168.1.9:5000',
    'http://192.168.1.147'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}

module.exports = function initCorsOptions(app) {
  app.use(cors(corsOptions))
}