import Vue from 'vue'
import App from './App.vue'
import Client from './application/Client.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Client),
}).$mount('#client')
