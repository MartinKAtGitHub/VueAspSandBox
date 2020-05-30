import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '../node_modules/@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '../node_modules/@fortawesome/vue-fontawesome'
// import {fas} from '../node_modules/@fortawesome/free-solid-svg-icons' // This imports the all the icons

import { faCircle, faCheckCircle, faPlusCircle, faListUl, faTrash, faSpinner } from '../node_modules/@fortawesome/free-solid-svg-icons'

library.add(faCircle, faCheckCircle, faPlusCircle, faListUl, faTrash, faSpinner)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false
new Vue({
    router,
    data: {
        randomData: "Foo",
        moreData: "Bar",
    },
    render: h => h(App)
}).$mount('#app')
