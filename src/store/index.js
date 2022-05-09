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
  actions: {
    crearUsuario({commit}, usuario){
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(res => {
        console.log(res)
        const usuarioCreado = {
          email: res.user.email,
          uid: res.user.id
        }
        commit('setUsuario', usuarioCreado)
        router.push('/login')
      })
      .catch(error => {
        console.log(error)
        commit('setError', error)
      })
    },
    cerrarSesion({commit}){
      auth.signOut()
        .then(() => {
          router.push('/login')
        })
    },
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
    },
    IngresoUsuario({commit}, usuario){
      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(res => {
        console.log(res)
        const usuarioLogueado = {
          email: res.user.email,
          uid: res.user.id
        }
        commit('setUsuario', usuarioLogueado)
        router.push('/Mesero')
      })
      .catch(error => {
        console.log(error)
        commit('setError', error)
      })
    }
  },
  modules: {
  }
})
