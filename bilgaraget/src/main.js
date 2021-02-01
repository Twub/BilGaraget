import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'

import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
  id: 'UA-188220465-1',
  router,
})

import store from './store'
import 'materialize-css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'materialize-css/dist/css/materialize.min.css'
import axios from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

//import 'bootstrap/dist/css/bootstrap.css'
import "bootswatch/dist/cosmo/bootstrap.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
