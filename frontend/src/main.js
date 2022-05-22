import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import pluginComponents from "@/components/pluginComponents"
import pluginLib from "@/lib/pluginLib"

Vue.config.productionTip = false

Vue.use(pluginComponents)
Vue.use(pluginLib)

require('@/assets/main.scss')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
