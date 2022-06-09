<template>
    <v-container>
    <v-data-table
      :headers="encabezado"
      :items="consulta"
      :items-per-page="5"
    >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Orden</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color = 'accent' @click="llenar_por_fecha()" class="ml-15">Por FECHA</v-btn>
        <v-btn color = 'accent' @click="llenar_por_mesero()" class="ml-15">Por MESERO</v-btn>
        <v-btn color = 'accent' @click="llenar_por_mesa()" class="ml-15">Por MESA</v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>

    </template>
      </v-data-table>
    </v-container>
</template>


<script>

export default {
    name: 'Consultas',
    
    data () {
      return {
        encabezado: [
          { text: 'Identificador',align: 'start',sortable: false,value: 'ord_id'},
          { text: 'Fecha', value: 'ord_fecha' },
          { text: 'Mesa', value: 'ord_mesa_id' },
          { text: 'mesero', value: 'ord_mese_id'},
          { text: 'Total', value: 'ord_total'},
        ],
        consulta: [ ],
      }
      },

    methods: {
      // LLENAR TABLA
      async llenar_por_fecha(){
        const api_data = await this.axios.get('/consulta/ordenes_por_fecha');
        this.consulta = api_data.data
      },
      async llenar_por_mesero(){
        const api_data = await this.axios.get('/consulta/mesero_por_fecha');
        this.consulta = api_data.data
      },   
      async llenar_por_mesa(){
        const api_data = await this.axios.get('/consulta/mesa_por_fecha');
        this.consulta = api_data.data
      },   
    }
}
</script>
