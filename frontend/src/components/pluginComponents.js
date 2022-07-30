import ElementUI from '../../node_modules/element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Modal from '@/components/feature/Modal'
import VTable from '@/components/feature/VTable'

import formButtom from '@/components/form/formButtom'
import formInput from '@/components/form/formInput'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const pluginComponents = {
  install(Vue) {
    Vue.use(ElementUI)

    Vue.component(Modal.name, Modal)
    Vue.component(VTable.name, VTable)
    Vue.component(formButtom.name, formButtom)
    Vue.component(formInput.name, formInput)

    /* fontawesome */
    library.add(fas)
    library.add(fab)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  },
}

export default pluginComponents
