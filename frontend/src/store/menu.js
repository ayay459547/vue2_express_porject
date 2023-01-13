import { menuData } from '@/store/FakeData'

export const menu = {
  namespaced: true,
  state: {
    menuList: [],
    currentMenu: {}
  },
  getters: {
    routerList (state) {
      return state.menuList.map(menuItem => {
        return {
          path: `/${menuItem.router}`,
          name: `/${menuItem.name}`,
          label: `/${menuItem.label}`,
          component: () => import(`@/menu/${menuItem.router}/${menuItem.router}`)
        }
      })
    }
  },
  mutations: {
    setData (state, menuList) {
      state.menuList.splice(0)
      this.$deepClone(state.menuList, menuList)
    },
    setCurrentMenu (state, menuData) {
      this.$deepClone(state.currentMenu, menuData)
    }
  },
  actions: {
    getData (context) {
      return this.$request({
        url: '/store/menu',
        method: 'get'
      }, menuData).then((resData) => {
        return resData
      })
    }
  }
}

export default menu
