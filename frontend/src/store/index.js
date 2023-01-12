import Vue from 'vue'
import Vuex from 'vuex'

import user from './user.js'
import menu from './menu.js'
import options from './options.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    menu,
    options
  }
})
