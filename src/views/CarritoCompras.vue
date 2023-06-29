<template>
  <div class="container">
    <div class="carrito" v-if="productos.length > 0">
      <div class="title">Carrito</div>
      <b-table
        class="table"
        borderer
        striped
        hover
        :items="productos"
        :fields="fields"
      >
        <template #cell(acciones)="data">
          <b-button variant="danger" @click="eliminarProducto(data.item.id)">
            <b-icon-trash />
          </b-button>
        </template>
      </b-table>

      <div class="botones">
        <b-button variant="danger" class="eliminar" @click="eliminarProductos"
          ><b-icon-cart-x />&nbsp;Eliminar productos</b-button
        >
        <b-button variant="success" class="finalizar" @click="pedidoFinalizado"
          ><b-icon-cart-plus />&nbsp;Finalizar compra</b-button
        >
      </div>
      <p class="total">Total: ${{ calcularTotal }}</p>
    </div>
    <div v-else class="noHayNada">
      <img
        src="https://media.tenor.com/lx2WSGRk8bcAAAAC/pulp-fiction-john-travolta.gif"
        alt=""
      />
      <p>No hay nada en el carrito :(</p>
    </div>
  </div>
</template>

<script>
import userStore from "../store/storeUser";
import productoStore from "../store/productoStore";
export default {
  data() {
    return {
      productoStore: productoStore,
      userStore: userStore,
      fields: ["id", "producto", "cantidad", "precio", "subtotal", "acciones"],
    };
  },
  methods: {
    eliminarProducto(id) {
      this.productoStore.eliminarProducto(id);
    },
    eliminarProductos() {
      this.productoStore.eliminarTodosLosProductos();
    },
    pedidoFinalizado() {
      if (this.userStore.usuario) {
        const pedido = {
          productos: this.productos,
          total: this.calcularTotal,
        };
        this.userStore.agregarPedido(pedido);
        this.eliminarProductos();
        this.$router.push({ name: "misPedidos" });
      } else {
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", this.$wal.stopTimer);
            toast.addEventListener("mouseleave", this.$wal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Debe estar logeado para finalizar una compra`,
        });
      }
    },
  },
  computed: {
    //Se usa la computada para calcular el total
    calcularTotal() {
      let total = 0;
      this.productos.forEach((producto) => {
        total += producto.subtotal;
      });
      return total;
    },
    productos() {
      return this.productoStore.productos;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.container {
  height: 100vh;
}
.eliminar {
  margin-bottom: 20px;
}
.botones {
  display: flex;
  flex-direction: column;
  justify-content: column;
  align-items: center;
  width: 500px;
}

.total {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  color: rgb(243, 191, 191);
}

.noHayNada {
  font-size: 30px;
  color: white;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.noHayNada img {
  margin-top: 200px;
  width: 20%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.carrito {
  margin-top: 20vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table {
  align-items: center;
  text-align: center;
  width: 90%;
  border-radius: 5;
  font-size: 20px;
  padding-left: 10px;
  color: #fff;
  font-weight: 400;
}

.title {
  width: 90%;
  background-color: rgb(52, 47, 47);
  font-size: 30px;
  padding-left: 10px;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>