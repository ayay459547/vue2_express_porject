module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: 5000,
    open: true,
    // allowedHosts: [
    //   'http://localhost:5000',
    //   'http://192.168.1.108:5000',
    // ],
    // https: {
    //   ca: './path/to/server.pem',
    //   pfx: './path/to/server.pfx',
    //   key: './path/to/server.key',
    //   cert: './path/to/server.crt',
    //   passphrase: 'webpack-dev-server',
    //   requestCert: true,
    // },
    proxy: {
      '/': {
        target: 'http://localhost:5050/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}