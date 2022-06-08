<template>
    <div>
        <br><br><br>
        <div class="card abs-center" style="background-color: #33475b;">
            <div class="card-body">
                <form @submit.prevent="IngresoUsuario({email: email, password: pass})" class="form">
                <div class="card">
                        <div class="card-header bg-light text-dark fw-bold ">
                            Inicio de Sesion
                        </div>
                        <div class="card-body">
                            
                                <div class="form-group">
                                    <input 
                                    type="email"
                                    placeholder="Ingrese su email"
                                    v-model="email"
                                    class="form-control mb-2"
                                    >
                                </div>
                                <div class="form-group">
                                    <input 
                                    type="password"
                                    placeholder="Ingrese contraseña"
                                    v-model="pass"
                                    class="form-control mb-2"
                                    >
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">Iniciar Sesion</button>
                                </div>
                            <router-link :to="{name: 'Registro'}" v-if="!existeUsuario">¿No tienes una cuenta? Registrate Aqui!</router-link>
                        </div>
                    </div>
                </form>
                <p>{{error}}</p>
            </div>
        </div>
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
<style>
.form {
  width: 800px;
}
.abs-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
