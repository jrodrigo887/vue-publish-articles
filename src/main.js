import Vue from 'vue'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import store from './config/store'
import router from './router/index'
import './config/bootstrap'
import './config/msg'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')