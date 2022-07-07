import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import Http from '@/api/http'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.$axios = Http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
