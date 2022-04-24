<template>
    <v-container>
    <v-data-table
      :headers="encabezado"
      :items="mesero"
      :items-per-page="5"
    >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Meseros</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color = 'accent' @click="n1_dialog=true">Añadir Mesero</v-btn>
      </v-toolbar>

    </template>
    <template v-slot:[`item.actions`]="{item}">
        <v-icon @click="eliminar_mesero(item)" small color="error">
         fas fa-trash-alt
        </v-icon>
      </template>
      </v-data-table>
      <v-dialog v-model='n1_dialog' max-width="500px">
        <v-card>
          <v-card-title>
            Nuevo Mesero
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols='6'>
                  <v-text-field v-model="nuevo_mesero.mese_nombre" label='Nombre'>
                  </v-text-field>
                </v-col>
                <v-col cols='6'>
                  <v-text-field v-model="nuevo_mesero.mese_honorario" label='Honorarios' type="Number">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color='success' @click="guardar()">Guardar</v-btn>
            <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
        </v-dialog>  
          
    </v-container>
</template>

<script>

export default ({
    name: 'mesero',
    
    data () {
      return {
        encabezado: [
          { text: 'Identificador',align: 'start',sortable: false,value: 'mese_id'},
          { text: 'Nombre', value: 'mese_nombre' },
          { text: 'Honorarios', value: 'mese_honorario'},
          { text: 'Acciones', value: 'actions'}
        ],
        mesero: [],
        n1_dialog: false,

        nuevo_mesero: {
          mese_nombre: '',
          mese_honorario: ''
        },
      }
    },
    created() {
        this.llenar_mesero();
        },


    methods: {
      // LLENAR TABLA
      async llenar_mesero(){
        const api_data = await this.axios.get('/mesero/todos_los_meseros/');
        this.mesero = api_data.data
      },
      //ELIMINAR ELEMNTO DE LA TABLA
     async eliminar_mesero(item){
        const body = {
          mese_id: item.mese_id
        };
        const data = await this.axios.post('/mesero/eliminar_mesero/',body);
        this.llenar_mesero();
      },
      //cancelar accion
      cancelar(){
        //primero borra variables
        this.nuevo_mesero={};
        this.n1_dialog=false;
      },
      //guardar libro
      async guardar(){
        await this.axios.post('/mesero/nuevo_mesero/',this.nuevo_mesero);
        this.llenar_mesero();
        this.cancelar();
      },
    },
})
</script>