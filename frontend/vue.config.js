module.exports = {
  devServer: {
    proxy: {
      '/menu': {
        // target: 'http://localhost:8090',
        target: 'http://192.168.1.9:8090',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/menu': '/menu' 
          //pathRewrite: {'^/menu': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          //pathRewrite: {'^/menu': '/menu'} 重写之后url为 http://192.168.1.16:8085/menu/xxxx
        }
      },
      '/store': {
        // target: 'http://localhost:8090',
        target: 'http://192.168.1.9:8090',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/store': '/store' 
          //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        }
      }
    }
  }
}