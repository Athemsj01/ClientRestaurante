<template>
    <div>
        <div class="card abs-center">
            <div class="card-body">
                <form @submit.prevent="crearUsuario({email: email, password: pass1})" class="form">
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
                                    v-model="pass1"
                                    class="form-control mb-2"
                                 >
                                </div>
                                <div class="form-group">
                                    <input 
                                    type="password"
                                    placeholder="Repita su contraseña"
                                    v-model="pass2"
                                    class="form-control mb-2"
                                >
                                </div>
                                <div class="form-group">
                                    <button type="submit" :disabled='!desactivar' class="btn btn-primary">Registrar</button>
                                </div>
                                
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
  width: 650px;
}
.abs-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

</style>
