module.exports = {
  devServer: {
    proxy: {
      '/menu': {
        target: 'http://localhost:8090',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/menu': '/menu'
        }
      },
      '/store': {
        target: 'http://localhost:8090',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/store': '/store'
        }
      }
    }
  }
}