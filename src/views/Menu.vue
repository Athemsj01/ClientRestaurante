<template>
 <div>
  <v-container>
    <v-data-table
      :headers="encabezadoComida"
      :items="menucomida"
      :items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Menu comida</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color = 'accent' @click="n1_dialog=true">Nuevo Platillo</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{item}">
        <v-icon @click="eliminar_platillo(item)" small color="error">
         fas fa-trash-alt
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model='n1_dialog' max-width="500px">
        <v-card>
          <v-card-title>
            Nuevo Platillo
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols='6'>
                  <v-text-field v-model="nuevo_platillo.menuco_nombre" label='Nombre'>
                  </v-text-field>
                </v-col>
                <v-col cols='6'>
                  <v-text-field v-model="nuevo_platillo.menuco_costo" label='Costo' type="Number">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols='6'>
                  <v-select 
                  :items="items"
                  v-model="nuevo_platillo.menuco_categoria" 
                  label='Categoria'>
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color='success' @click="guardar_platillo()">Guardar</v-btn>
            <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
        </v-dialog>

    <v-data-table
      :headers="encabezadoBebida"
      :items="menuBebida"
      :items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Menu Bebida</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color = 'accent' @click="n2_dialog=true">Nueva Bebida</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{item}">
        <v-icon @click="eliminar_bebida(item)" small color="error">
         fas fa-trash-alt
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model='n2_dialog' max-width="500px">
        <v-card>
          <v-card-title>
            Nuevo Bebida
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols='6'>
                  <v-text-field v-model="nueva_bebida.menube_nombre" label='Nombre'>
                  </v-text-field>
                </v-col>
                <v-col cols='6'>
                  <v-text-field v-model="nueva_bebida.menube_costo" label='Costo' type="Number">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols='6'>
                  <v-select 
                  :items="items"
                  v-model="nueva_bebida.menube_categoria" 
                  label='Categoria'>
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color='success' @click="guardar_bebida()">Guardar</v-btn>
            <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
        </v-dialog>
          
  </v-container>
  </div>
</template>



<script>

  export default {
    name: 'Menu',
    
    data () {
      return {
        items: ['Ensaladas','Sopa','Carnes', 'Mariscos', 'Desayuno'], //Para seleccionar categoria de comida
        items: ['REFRESCO','AGUA','ALCOHOL'], //Para seleccionar categoria de bebida
        encabezadoComida: [
          { text: 'Identificador',align: 'start',sortable: false,value: 'menuco_id'},
          { text: 'Nombre', value: 'menuco_nombre' },
          { text: 'Costo', value: 'menuco_costo' },
          { text: 'Categoria', value: 'menuco_categoria' },
          { text: 'Acciones', value: 'actions'},
        ],
        menucomida: [ ],
        n1_dialog: false,
        nuevo_platillo: {
          menuco_nombre: '',
          menuco_costo: '',
          menuco_categoria: '',
        },

        encabezadoBebida: [
          { text: 'Identificador',align: 'start',sortable: false,value: 'menube_id'},
          { text: 'Nombre', value: 'menube_nombre' },
          { text: 'Costo', value: 'menube_costo' },
          { text: 'Categoria', value: 'menube_categoria' },
          { text: 'Acciones', value: 'actions'}
        ],
        menuBebida: [ ],
        n2_dialog: false,
        nueva_bebida: {
          menube_nombre: '',
          menube_costo: '',
          menube_categoria: '',
        },
        }
      },
    created() {
        this.llenar_menuco();
        this.llenar_menube();
        },


    methods: {
      // LLENAR TABLA
      async llenar_menuco(){
        const api_data = await this.axios.get('/menu_comida/menu_de_comida');
        this.menucomida = api_data.data
      },
      async llenar_menube(){
        const api_data = await this.axios.get('/menu_bebidas/menu_bebidas');
        this.menuBebida = api_data.data
      },
      //ELIMINAR DATOS DE TABLA
      async eliminar_platillo(item){
        const body = {
          menuco_id: item.menuco_id
        };
        const data = await this.axios.post('/menu_comida/eliminar_platillo/',body);
        this.llenar_menuco();
      },
      async eliminar_bebida(item){
        const body = {
          menube_id: item.menube_id
        };
        const data = await this.axios.post('/menu_bebidas/eliminar_bebida/',body);
        this.llenar_menube();
      },
      //ACCIONES DE GUARDADO Y CANCELAR
      //cancelar accion
      cancelar(){
        //primero borra variables
        this.nuevo_platillo={};
        this.n1_dialog=false;
        this.nueva_bebida={};
        this.n2_dialog=false;
      },
      //Platillo
      async guardar_platillo(){
        await this.axios.post('menu_comida/nuevo_platillo/',this.nuevo_platillo);
        this.llenar_menuco();
        this.cancelar();
      },
      async guardar_bebida(){
        await this.axios.post('menu_bebidas/nueva_bebida/',this.nueva_bebida);
        this.llenar_menube();
        this.cancelar();
      },
    },
  }
</script>
