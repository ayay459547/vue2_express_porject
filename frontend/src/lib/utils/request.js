import axios from 'axios'

export default {
  funName: '$request',
  func (config, fakeData = null, connectApi = true) {
    // 回傳假資料
    if (!connectApi) {
      return Promise.resolve({
        data: fakeData,
        status: 'success',
      })
    }

    // 1.創建 axios 實例
    const instance = axios.create({
      baseURL: '/',
      timeout: 5000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // 2.axios 的攔截器
    // 2.1.請求攔截器的作用
    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        console.log(err)
      }
    )

    // 2.2.響應攔截
    instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        console.log(err)
      }
    )

    // 3.發送真正的網路請求
    return instance(config)
  },
}
