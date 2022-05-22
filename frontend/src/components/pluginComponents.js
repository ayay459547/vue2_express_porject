import ElementUI from '../../node_modules/element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import modal from '@/components/feature/modal'
import tableTemplate from '@/components/feature/tableTemplate'
import filterTemplate from '@/components/feature/filterTemplate'

import formButtom from '@/components/form/formButtom'

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
    Vue.component(formButtom.name, formButtom)

    /* fontawesome */
    library.add(faUserSecret)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  },
}

export default pluginComponents
