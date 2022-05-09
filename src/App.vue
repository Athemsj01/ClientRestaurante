<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-main>
      <v-row class= "mt-5">

      <v-spacer></v-spacer>
        
        <router-link :to="{name: 'Inicio'}" v-if="existeUsuario" class="mr-5">Inicio</router-link>
        <router-link :to="{name: 'Mesero'}" v-if="existeUsuario" class="mr-5">Meseros</router-link>
        <router-link :to="{name: 'Registro'}" v-if="!existeUsuario" class="mr-5">Registro</router-link>
        <router-link :to="{name: 'Login'}" v-if="!existeUsuario" class="mr-5">Login</router-link>
        <button @click="cerrarSesion" v-if="existeUsuario" >Cerrar Sesion</button>


      <v-spacer></v-spacer>

      </v-row>

      <router-view>

      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters} from "vuex";
export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['cerrarSesion'])
  },
  computed:{
    ...mapGetters(['existeUsuario'])
  }
};
</script>
