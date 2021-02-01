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

//vue toastification
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
};


Vue.use(Toast, options);


//end of vue toastification


//axios config
Axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
   "Access-Control-Allow-Origin" : '*',
   "Content-Type": "application/json",
   Accept: "application/json"
 };
Vue.prototype.$http=Axios;
//axios config

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')