import ElementUI from '../../node_modules/element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VModal from '@/components/feature/VModal.vue'
import VTable from '@/components/feature/VTable.vue'

import FormButton from '@/components/form/FormButton.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormSelect from '@/components/form/FormSelect.vue'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const pluginComponents = {
  install(Vue) {
    Vue.use(ElementUI)

    Vue.component(VModal.name, VModal)
    Vue.component(VTable.name, VTable)
    Vue.component(FormButton.name, FormButton)
    Vue.component(FormInput.name, FormInput)
    Vue.component(FormSelect.name, FormSelect)

    /* fontawesome */
    library.add(fas)
    library.add(fab)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  },
}

export default pluginComponents
