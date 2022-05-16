import Vue from 'vue'
import Vuex from 'vuex'

import {auth} from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null
  },
  getters: {
    existeUsuario(state){
      if(state.usuario === null){
        return false
      }else{
        return true
      }
    }
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    }
  },
  
  modules: {
  }
})
