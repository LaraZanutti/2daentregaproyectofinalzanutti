<template>
  <div class="container">
    <div
      class="spinner d-flex justify-content-center align-center w-100"
      v-if="loading"
    >
      <b-spinner variant="light"></b-spinner>
    </div>
    <div v-else-if="!pedidos.length">
      <div class="nohay">No hay pedidos</div>
      <div class="comprar">
        <b-button variant="danger" @click="$router.push({ name: 'home' })"
          >Comprar en la tienda</b-button
        >
      </div>
    </div>
    <template v-else>
      <div v-for="(pedido, index) in pedidos" :key="index" class="pedido">
        <h3 class="pedidoTitle">Pedido N° {{ index + 1 }}</h3>
        <b-table
          class="texto"
          striped
          hover
          :items="pedido.productos"
        ></b-table>
        <b class="total">Total: $ {{ pedido.total }}</b>
        <hr v-if="index < pedidos.length - 1" class="w-100" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MisPedidos",
  data() {
    return {
      loading: true,
    };
  },
  async created() {
    await this.traerPedidosDeUsuario();
    this.loading = false;
  },
  computed: {
    ...mapGetters("userStore", ["getUsuario"]),
    pedidos() {
      return this.getUsuario?.misPedidos;
    },
  },
  methods: {
    ...mapActions("userStore", ["traerPedidosDeUsuario"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
.pedido {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.75);
  flex-direction: column;
}
.container {
  margin-top: 50px;
  padding-bottom: 30px;
}

.table {
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 10;
}

.pedidoTitle {
  font-size: 25px;
  margin-bottom: 15px;
}

.texto {
  font-weight: 600;
}
.total {
  color: green;
  font-size: 25px;
}

.nohay {
  margin-top: 100px;
  font-family: "Bebas Neue", sans-serif;
  font-weight: bold;
  font-size: 70px;
  color: white;
  letter-spacing: 2px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.comprar {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}
</style>