import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from 'axios';


import {
    BootstrapVue,
    IconsPlugin
} from 'bootstrap-vue'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//import 'vue-toast-notification/dist/theme-sugar.css';

//export json to csv
// import VueBlobJsonCsv from 'vue-blob-json-csv';

// Vue.use(VueBlobJsonCsv)


//vue-progressbar
import VueProgressBar from 'vue-progressbar'

const progressBarOptions = {
    color: '#f4511e',
    failedColor: '#874b4b',
    thickness: '2px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false,
    position: 'relative',
}

Vue.use(VueProgressBar, progressBarOptions)
//vue-progressbar

//axios allow cross origin
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.common['Accept']='json';
Vue.prototype.$http=Axios;

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')