<template>
  <div>
    <login v-if="!isLogin"/>
    <v-layout v-if="initFinally"/>
    <loading-compontent ref="loading"/>
  </div>
</template>

<script>
import router from '@/router'
import Layout from '@/components/layout'
import loadingCompontent from '@/components/feature/loading'
import Login from '@/views/Login'

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
      return this.$store.getters['menu/routerList']
    }
  },
  methods: {
    async init () {
      try {
        // 設定使用者和路由
        await Promise.all([
          this.settingUser()
        ])
        await Promise.all([
          this.settingMenu()
        ])
        // 設定懶加載路由
        await setTimeout(() => {
          this.settingRouter()
        })

        // 預設先都到首頁
        this.$store.commit('menu/setCurrentMenu', this.menuList[0])
        this.$router.push({ name: 'Setting' })
      } catch (e) {
        this.swal({
          icon: 'error',
          title: '初始化失敗!',
          text: '請洽詢服務人員'
        })
      } finally {
        this.initFinally = true
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
      this.routerList.forEach(routerItem => {
        router.addRoute(routerItem)
      })
    }
  },
  created () {
    // this.init()
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
