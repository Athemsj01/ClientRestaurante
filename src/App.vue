<template>
  <v-app style="background-color: #33475b;">
    <v-app-bar
      absolute
      color="#fcb69f"
      dark
      shrink-on-scroll
      src="https://i.picsum.photos/id/242/1920/1080.jpg?hmac=827s1zYLrBxeQOSrGy_dv_O3xzJXLANpyXMwZU6HQzE"
      scroll-target="#scrolling-techniques-2"
    >
    </v-app-bar>
    <v-main>
          <br><br>
          <br><br><br>
      <v-spacer></v-spacer>
      <v-row class= "mt-5">
      <v-spacer></v-spacer>
        
        <router-link :to="{name: 'Inicio'}" v-if="existeUsuario" class="mr-5 btn btn-outline-info">Inicio</router-link>
        <router-link :to="{name: 'Mesero'}" v-if="existeUsuario" class="mr-5 btn btn-outline-info">Meseros</router-link>
        <router-link :to="{name: 'Menu'}" v-if="existeUsuario" class="mr-5 btn btn-outline-info">Menu</router-link>
        <router-link :to="{name: 'Ordenes'}" v-if="existeUsuario" class="mr-5 btn btn-outline-info">Ordenes</router-link>
        <router-link :to="{name: 'Consulta'}" v-if="existeUsuario" class="mr-5 btn btn-outline-info">Administracion de Ventas</router-link>
        <!-- <router-link :to="{name: 'Total'}" v-if="existeUsuario" class="mr-5">Total de ventas</router-link> 
        <router-link :to="{name: 'Registro'}" v-if="!existeUsuario" class="mr-5">Registro</router-link>
        <router-link :to="{name: 'Login'}" v-if="!existeUsuario" class="mr-5">Login</router-link>-->
        <button @click="cerrarSesion" v-if="existeUsuario" class="mr-5 btn btn-outline-info">Cerrar Sesion</button>


      <v-spacer></v-spacer>

      </v-row>
      <br><br>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters} from "vuex"
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
