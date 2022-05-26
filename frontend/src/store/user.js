import { userData } from '@/store/FakeData'

export const user = {
  namespaced: true,
  state: {
    id: null,
    name: null
  },
  getters: {
    isLogin (state) {
      if (state.id > 0 && state.name !== '') {
        return true
      } else {
        return false
      }
    }
  },
  mutations: {
    setData (state, { id = null, name = null }) {
      state.id = id
      state.name = name
    }
  },
  actions: {
    getData (context) {
      return this.$request({
        url: '/store/user',
        method: 'post',
        data: {
          userId: 2
        }
      }, userData).then((resData) => {
        return resData
      })
    }
  }
}

export default user