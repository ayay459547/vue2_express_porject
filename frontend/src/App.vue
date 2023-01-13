<template>
  <div>
    <login v-if="initFinally && !isLogin" @init="init"/>
    <v-layout v-if="initFinally && isLogin" @logout="logout"/>
    <loading-compontent ref="loading"/>
  </div>
</template>

<script>
import router from '@/router'
import Layout from '@/components/layout'
import Login from '@/views/Login'
import loadingCompontent from '@/components/feature/VLoading'

export default {
  components: {
    'v-layout': Layout,
    loadingCompontent,
    Login
  },
  data () {
    return {
      initFinally: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['user/isLogin']
    },
    menuList () {
      return this.$store.state.menu.menuList
    },
    routerList () {
      return router.getRoutes()
    }
  },
  methods: {
    logout () {
      this.$request({
        url: '/views/logout',
        method: 'post'
      }, null).then((resData) => {
        this.init()
      })
    },
    testApi () {
      return this.$request({
        url: '/test',
        method: 'get'
      }, {}).then((resData) => {
        return resData
      })
    },
    async init () {
      // const testData = await this.testApi()
      // console.log(testData)

      this.$bus.$emit('loading', { type: 'open' })

      try {
        // 設定使用者和路由
        await Promise.all([
          this.settingUser(),
          this.settingMenu()
        ])
        // 設定懶加載路由
        setTimeout(() => {
          this.settingRouter()
        })

        // 預設先都到首頁
        // this.$store.commit('menu/setCurrentMenu', this.menuList[0])
        // this.$router.push({ name: 'Setting' })
      } catch (e) {
        this.swal({
          icon: 'error',
          title: '初始化失敗!',
          text: '請洽詢服務人員'
        })
      } finally {
        this.initFinally = true

        this.$bus.$emit('loading', { type: 'close' })
      }
    },
    async settingUser () {
      try {
        let { data: userData } = await this.$store.dispatch('user/getData')
        this.$store.commit('user/setData', userData)
      } catch(e) {
        this.swal({
          icon: 'error',
          title: '獲取個人資料失敗!',
          text: '請洽詢服務人員'
        })
      }
    },
    async settingMenu () {
      try {
        let { data: menuData } = await this.$store.dispatch('menu/getData')
        this.$store.commit('menu/setData', menuData)
      } catch(e) {
        this.swal({
          icon: 'error',
          title: '獲取選單資料失敗!',
          text: '請洽詢服務人員'
        })
      }
    },
    settingRouter () {
      let routerList = this.menuList.map(menuItem => {
        return {
          path: `/${menuItem.router}`,
          name: `${menuItem.name}`,
          component: () => import(`@/menu/${menuItem.router}/${menuItem.router}`)
        }
      })

      routerList.forEach(routerItem => {
        router.addRoute(routerItem)
      })
    }
  },
  created () {
    setTimeout(() => {
      this.init()
    })

    console.log(router)
  }
}
</script>


<style lang="scss"></style>
