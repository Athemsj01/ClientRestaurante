<template>
     <v-container>
    <v-data-table
      :headers="encabezado"
      :items="orden"
      :items-per-page="5"
    >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Orden</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color = 'accent' @click="n1_dialog=true">Añadir Orden</v-btn>
      </v-toolbar>

    </template>
    <template v-slot:[`item.actions`]="{item}">
        <v-icon @click="eliminar_orden(item)" small color="error" class="mr-5">
         fas fa-trash-alt
        </v-icon>
        <v-icon @click="agregar_plato(item)" small class="mr-5">
         fas fa-utensils
        </v-icon>
        <v-icon @click="agregar_bebida(item)" small color="green" class="mr-5">
         fas fa-wine-bottle
        </v-icon>
        <v-icon @click="detalle_orden_comida(item)" small color="green" class="mr-5">
         fas fa-eye
        </v-icon>
        <v-icon @click="detalle_orden_bebida(item)" small color="primary" class="mr-5">
         fas fa-eye
        </v-icon>
      </template>
      </v-data-table>
        <v-dialog v-model='n1_dialog' max-width="500px">
          <v-card>
          <v-card-title>Nueva Orden</v-card-title>
          <v-card-text>
            <v-container>
            <v-row cols="12">
              <v-select
                :items="mesa"
                v-model="nueva_orden.ord_mesa_id"
                label="Mesa"
              ></v-select>
            </v-row>
            <v-row cols="12">
              <v-select
                :items="mesero"
                v-model="nueva_orden.ord_mese_id"
                label="Mesero"
              ></v-select>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="nueva_orden.ord_fecha"
                      label="Fecha"
                      prepend-icon="far fa-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="nueva_orden.ord_fecha"
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols='6'>
                  <v-text-field v-model="nueva_orden.ord_pago" label='Pago' type="Number">
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
      <v-dialog v-model='comida_dialog' max-width="500px">
          <v-card>
          <v-card-title>
            AGREGAR PLATILLO
            <v-spacer></v-spacer>
            <v-btn color = 'primary' @click="agregar_renglon_comida()">Agregar Plato</v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row v-for="(plato,index) in ali_ord" v-bind:key="index">
                <v-col cols="12">
                  <v-select
                      :items="platillos"
                      label="Nombre del plato"
                      v-model="plato.ali_menuco_id"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="guardar_platillo()">Guardar</v-btn>
            <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model='bebida_dialog' max-width="500px">
          <v-card>
          <v-card-title>
            AGREGAR BEBIDA
            <v-spacer></v-spacer>
            <v-btn color = 'primary' @click="agregar_renglon_bebida()">Agregar Plato</v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row v-for="(bebida,index) in beb_ord" v-bind:key="index">
                <v-col cols="12">
                  <v-select
                      :items="bebidas"
                      label="Nombre del la bebida"
                      v-model="bebida.beb_menube_id"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="guardar_bebida()">Guardar</v-btn>
            <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model='p_dialog' max-width="500px">
        <v-card>
          <v-card-title>
            Orden Completa
          </v-card-title>
          <v-card-text>
            <v-container>
              <row v-for="(orden,index) in ord_detail_food" v-bind:key="index">
                <v-col cols="6">
                  <v-text-field label="Platillo" v-model="orden.ord_comida" disabled >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="Cantidad" v-model="orden.ord_cantidad_platos" disabled >
                  </v-text-field>
                </v-col>
              </row>
            </v-container>
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model='beb_dialog' max-width="500px">
        <v-card>
          <v-card-title>
            Orden Completa
          </v-card-title>
          <v-card-text>
            <v-container>
                <row v-for="(orde,index) in ord_detail_drink" v-bind:key="index">
                  <v-col cols="6">
                  <v-text-field label="Bebida" v-model="orde.ord_bebidas" disabled >
                  </v-text-field>
                  </v-col>
                  <v-col cols="3">
                  <v-text-field label="Cantidad" v-model="orde.ord_cantidad_bebidas" disabled >
                  </v-text-field>
                  </v-col>
              </row>
            </v-container>
          </v-card-text> 
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-dialog>

      
    </v-container>
</template>


<script>
export default {
    name: 'orden',
    
    data () {
      return {
        encabezado: [
          { text: 'Identificador',align: 'start',sortable: false,value: 'ord_id'},
          { text: 'Mesa', value: 'ord_mesa_id' },
          { text: 'Mesero', value: 'ord_mese_nombre' },
          { text: 'Fecha de Orden', value: 'ord_fecha' },
          { text: 'Pago', value: 'ord_pago' },
          { text: 'Acciones', value: 'actions'}

        ],
        orden: [],
        mesa: [],
        mesero: [],
        platillos: [],
        ali_ord:[],
        alimen_menuco_id: '',
        bebidas: [],
        beb_ord: [],
        bebi_menube_id: '',
        ord_detail_food: [],
        ord_detail_drink: [],


        n1_dialog: false,
        comida_dialog: false,
        bebida_dialog: false,
        p_dialog: false,
        beb_dialog: false,
        menu1: false,

        nueva_orden: {
          ord_mesa_id: '',
          ord_mese_id: '',
          ord_fecha: '',
          ord_pago: '',

        },
      }
    },
    created() {
        this.llenar_orden();
        this.llenar_mesa_lista();
        this.llenar_mesero_lista();
        this.llenar_platillos_lista();
        this.llenar_bebidas_lista()
        },


    methods: {
      // LLENAR TABLA
      async llenar_orden(){
        const api_data = await this.axios.get('/ordenes/mostrar_orden');
        this.orden = api_data.data
      },
      //ELIMINAR ELEMNTO DE LA TABLA
     async eliminar_orden(item){
        const body = {
          ord_id: item.ord_id
        };
        const data = await this.axios.post('/ordenes/eliminar_orden/',body);
        this.llenar_orden();
      },
      //GUARDAR Y CANCELAR
      //primero borra variables
      cancelar(){
        this.nueva_orden={};
        this.n1_dialog=false;
        this.ali_ord=[];
        this.comida_dialog=false;
        this.beb_ord=[];
        this.bebida_dialog=false;
      },
      //guardar libro
      async guardar(){
        await this.axios.post('/ordenes/nueva_orden/',this.nueva_orden)
        this.llenar_orden();
        this.cancelar();
      },
      //LLENADO DE LISTAS
      //Mesas
      async llenar_mesa_lista(){ //para lista desplegable
        const api_data = await this.axios.get('/ordenes/mostrar_mesa');
        api_data.data.forEach((item) => {
          this.mesa.push({
            text: item.mesa_id + ' ' + item.mesa_localizacion + '( ' + item.mesa_capacidad + ' Personas)',
            value: item.mesa_id
          });
        });
      },
      //Meseros
      async llenar_mesero_lista(){ //para lista desplegable
        const api_data = await this.axios.get('/mesero/todos_los_meseros');
        api_data.data.forEach((item) => {
          this.mesero.push({
            text: item.mese_nombre,
            value: item.mese_id
          });
        });
      },
      //Comida
      async llenar_platillos_lista(){ //para lista desplegable
        const api_data = await this.axios.get('/menu_comida/menu_de_comida');
        api_data.data.forEach((item) => {
          this.platillos.push({
            text: item.menuco_nombre,
            value: item.menuco_id
          });
        });
      },
      //Bebida
      async llenar_bebidas_lista(){ //para lista desplegable
        const api_data = await this.axios.get('/menu_bebidas/menu_bebidas');
        api_data.data.forEach((item) => {
          this.bebidas.push({
            text: item.menube_nombre,
            value: item.menube_id
          });
        });
      },

      //ABRIR ACCION AÑADIR
      agregar_plato(item){
        this.ali_ord_id=item.ord_id;
        this.comida_dialog=true; 
      },
      agregar_bebida(item){
        this.beb_ord_id=item.ord_id;
        this.bebida_dialog=true; 
      },
      //agregar extra
      agregar_renglon_comida(item){
        this.ali_ord.push({
          ali_menuco_id: '',
        });
      },
      agregar_renglon_bebida(item){
        this.beb_ord.push({
          beb_menube_id: '',
        });
      },
      //GUARDAR PLATO
      async guardar_platillo(){
        const body = {
          ali_ord_id: this.ali_ord_id,
          ali_menuco_id: '',
        };
        this.ali_ord.forEach(async(plato) =>{
          body.ali_menuco_id = plato.ali_menuco_id;
          await this.axios.post('/ordenes/nuevo_ali_ord/',body);
        });
        this.cancelar();
      },
      async guardar_bebida(){
        const body = {
          beb_ord_id: this.beb_ord_id,
          beb_menube_id: '',
        };
        this.beb_ord.forEach(async(bebida) =>{
          body.beb_menube_id = bebida.beb_menube_id;
          await this.axios.post('/ordenes/nuevo_beb_ord/',body);
        });
        this.cancelar();
      },

      //DETALLES DE LA ORDEN
      async detalle_orden_comida(item){ //para mostrar datos
        this.p_dialog =true;
        const api_data = await this.axios.get('/ordenes/leer_detalles_comida/' + item.ord_id.toString());
        this.ord_detail_food = api_data.data;
      },
      async detalle_orden_bebida(item){ //para mostrar datos
        this.beb_dialog =true;
        const api_data = await this.axios.get('/ordenes/leer_detalles_bebida/' + item.ord_id.toString());
        this.ord_detail_drink = api_data.data;
      },
    }
}
</script>
