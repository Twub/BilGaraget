import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css'

import 'materialize-css/dist/css/materialize.min.css'

Vue.config.productionTip = false

//import 'bootstrap/dist/css/bootstrap.css'
import "bootswatch/dist/cosmo/bootstrap.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
