import ElementUI from '../../node_modules/element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import modal from '@/components/feature/modal'
import tableTemplate from '@/components/feature/tableTemplate'
import filterTemplate from '@/components/feature/filterTemplate'

import customButton from '@/components/form/customButton'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const pluginComponents = {
  install(Vue) {
    Vue.use(ElementUI)

    Vue.component(modal.name, modal)
    Vue.component(tableTemplate.name, tableTemplate)
    Vue.component(filterTemplate.name, filterTemplate)
    Vue.component(customButton.name, customButton)

    /* fontawesome */
    library.add(faUserSecret)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  },
}

export default pluginComponents
