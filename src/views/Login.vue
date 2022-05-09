<template>
    <div>
        
        <h1>Inicion de Sesion de usuarios</h1>
        <form @submit.prevent="IngresoUsuario({email: email, password: pass})">
            <input 
            type="email"
            placeholder="Ingrese email"
            v-model="email"
            >
            <input 
            type="password"
            placeholder="Ingrese contraseña"
            v-model="pass"
            >
            <button type="submit">Iniciar Sesion</button>
        </form>
        <p>{{error}}</p>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex"
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            pass: ''
        }
    },
    methods: {
        ...mapActions(['IngresoUsuario'])
    },
    computed: {
        ...mapState(['error'])
    }
}
</script>