import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false

import {auth} from './firebase'

auth.onAuthStateChanged(user => {
  if(user){
    console.log(user)
    const detectoUsuario = {
      email: user.email,
      uid: user.id
    }
    store.dispatch('detectarUsuario', detectoUsuario)
  }else{
    console.log(user)
    store.dispatch('detectarUsuario', user)
  }

  Vue.use(VueAxios, axios);
  axios.defaults.baseURL = 'http://localhost:3000/';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

})


