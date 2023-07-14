<template>
  <div class="container">
    <div class="spinner d-flex justify-content-center align-center mt-3" v-if="loading">
      <b-spinner variant="light"></b-spinner>
    </div>
    <template v-else>
      <div v-for="(pedido, index) in pedidos" :key="index" class="pedido">
        <h3 class="pedidoTitle">
          Pedido N° {{ index + 1 }} de {{ pedido.usuario.username }}
        </h3>
        <b-table class="texto" striped hover :items="pedido.productos"></b-table>
        <b class="total">Total: $ {{ pedido.total }}</b>
        <hr v-if="index < pedidos.length - 1" class="w-100" />
      </div>
    </template>
  </div>
</template>

<script>
import { get } from '../services/httpService'
export default {
  data() {
    return {
      pedidos: [],
      loading: true,
    };
  },
  async created() {
    await this.traerProductos();
    this.loading = false;
  },
  methods: {
    async traerProductos() {
      await get(import.meta.env.VITE_MOCKAPI_URL_PEDIDOS)
        .then((data) => {
          this.pedidos = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
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
</style>