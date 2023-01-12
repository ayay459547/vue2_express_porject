import { options } from '@/store/FakeData'

export const optionsVuex = {
  namespaced: true,
  state: {
    menu: []
  },
  getters: {},
  mutations: {
    setMenu (state, menuList) {
      state.menu.splice(0)

      menuList.forEach(menu => {
        state.menu.push({
          value: menu.id,
          label: menu.name
        })
      })
    }
  },
  actions: {
    async init ({ dispatch, commit, state }) {
      if (state.menu.length > 0) return

      const { data: menuData } = await dispatch('getData')

      commit('setMenu', menuData)
    },
    getData (context) {
      return this.$request({
        url: '/store/options',
        method: 'get'
      }, options).then((resData) => {
        return resData
      })
    }
  }
}

export default optionsVuex