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
        <!--<router-link :to="{name: 'Home'}" class="mr-5">Menu</router-link>-->
        <a href="https://nandokori12.000webhostapp.com/index.php" class="mr-5">Login</a>

        <router-link :to="{name: 'Mesero'}" class="mr-5">Meseros</router-link>

      <v-spacer></v-spacer>

      </v-row>

      <router-view>

      </router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
