<template>
    <div class="container">
        <h1 class="text-center text-color white">BIENVENIDO!
        <br><br>
        {{usuario.email}}
        </h1>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: 'Inicio',
    computed: {
        ...mapState(['usuario'])
    }
}
</script>
