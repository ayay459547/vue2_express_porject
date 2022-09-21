import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import pluginComponents from "@/components/pluginComponents"
import pluginLib from "@/lib/pluginLib"

import VFixed from '@/lib/v-fixed'

Vue.config.productionTip = false

/**
 * vue plugin
 * https://medium.com/swlh/how-to-create-a-vue-plugin-36d5987d4768
 */
Vue.use(pluginComponents)
Vue.use(pluginLib)
Vue.use(VFixed, { router, store })

require('@/assets/main.scss')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
