module.exports = {
  devServer: {
    port: 5000,
    allowedHosts: [
      'http://localhost:5050',
      'http://192.168.1.9:5050',
      'http://192.168.1.147',
    ],
    // https: {
    //   ca: './path/to/server.pem',
    //   pfx: './path/to/server.pfx',
    //   key: './path/to/server.key',
    //   cert: './path/to/server.crt',
    //   passphrase: 'webpack-dev-server',
    //   requestCert: true,
    // },
    proxy: {
      '/menu': {
        target: 'http://192.168.1.9:5000',
        // target: 'http://127.0.0.1:5000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/menu': '/menu'
        }
      },
      '/store': {
        target: 'http://192.168.1.9:5000',
        // target: 'http://127.0.0.1:5000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/store': '/store'
        }
      }
    }
  }
}