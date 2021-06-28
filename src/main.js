import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'taipei-sans-tc'
import 'taipei-sans-tc/dist/Bold/TaipeiSansTCBeta-Bold.css'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
