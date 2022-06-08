<template>
    <div>
        <br><br><br>
        <div class="card abs-center" style="background-color: #33475b;">
            <div class="card-body">
                <form @submit.prevent="crearUsuario({email: email, password: pass1})" class="form">
                    <div class="card">
                        <div class="card-header bg-light text-dark fw-bold ">
                            Registrar Cuenta
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
                                <router-link :to="{name: 'Login'}" v-if="!existeUsuario">¿Ya tienen una cuenta? Inicia Sesion Aqui!</router-link>
                            </div>
                    </div>
                </form>
                <p>{{error}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState} from 'vuex'
export default {
    name: 'Registro',
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    created(){

    },
    methods: {
        ...mapActions(['crearUsuario'])
    },
    computed:{
        ...mapState(['error']),
        desactivar(){
            return this.pass1 === this.pass2 && this.pass1.trim() !== '' && this.pass1.length > 5
        }
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
