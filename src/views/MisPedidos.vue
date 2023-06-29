<template>
  <div class="container">
    <div v-for="(pedido, index) in pedidos" :key="index" class="pedido">
      <h3 class="pedidoTitle">Pedido N° {{ index + 1 }}</h3>
      <b-table class="texto" striped hover :items="pedido.productos"></b-table>
      <b class="total">Total: $ {{ pedido.total }}</b>
      <hr v-if="index < pedidos.length - 1" class="w-100" />
    </div>
  </div>
</template>

<script>
import userStore from "../store/storeUser";
export default {
  name: "MisPedidos",
  data() {
    return {
      userStore: userStore,
    };
  },
  computed: {
    pedidos() {
      return this.userStore.usuario.misPedidos;
    },
  },
};
</script>

<style scoped>
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