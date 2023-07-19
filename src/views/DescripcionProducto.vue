<template>
  <div class="container">
    <div class="spinner d-flex justify-content-center mb-3 align-items-center" v-if="loading">
      <b-spinner variant="light"></b-spinner>
    </div>

    <div class="product-detail" v-else>
      <div class="image">
        <img :src="producto.thumbnail" alt="Producto" />
      </div>
      <div class="content">
        <h2>{{ producto.title }}</h2>
        <p>{{ producto.description }}</p>
        <p class="price">$ {{ producto.price }}</p>
        <b-input-group class="mt-3">
          <b-input-group-prepend>
            <b-button @click="restarProducto" variant="outline-danger"><b-icon-patch-minus /></b-button>
          </b-input-group-prepend>
          <b-form-input class="text-center" v-model="cantidadProducto"></b-form-input>
          <b-input-group-append>
            <b-button @click="sumarProducto" variant="outline-success"><b-icon-patch-plus /></b-button>
          </b-input-group-append>
        </b-input-group>

        <div class="agregar">
          <b-button :disabled="cantidadProducto === 0" class="agregar" @click="agregarCarrito" variant="success">Agregar
            al carrito</b-button>
        </div>
      </div>
    </div>
    <div class="d-flex w-100 justify-content-center mt-5">
      <b-button class="arrow" variant="dark" @click="volverALaLista"> <b-icon-arrow-left-circle /></b-button>
    </div>
  </div>
</template>

<script>
import { get } from '../services/httpService'
import { mapActions } from "vuex";
export default {
  data() {
    return {
      producto: null,
      cantidadProducto: 0,
      loading: true,
    };
  },
  async created() {
    await this.fetchProduct();
  },
  methods: {
    ...mapActions("productoStore", ["agregarProducto"]),
    async fetchProduct() {
      const { VITE_MOCKAPI_URL_PRODUCTOS: productUrl } = import.meta.env
      await get(
        `${productUrl}/${this.$route.params.id
        }`
      )
        .then((data) => {
          this.producto = data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    restarProducto() {
      if (this.cantidadProducto === 0) return;
      this.cantidadProducto--;
    },
    sumarProducto() {
      this.cantidadProducto++;
    },
    agregarCarrito() {
      this.agregarProducto({
        id: this.producto.id,
        producto: this.producto.title,
        cantidad: this.cantidadProducto,
        precio: this.producto.price,
        subtotal: this.cantidadProducto * this.producto.price,
      });
    },
    volverALaLista() {
      this.$router.push({ name: "home" })
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

@media (max-width: 992px) {
  product-detail {
    display: flex;
    flex-direction: column;
  }
}

.container {
  height: 100vh;
  padding: 50px;
}

.product-detail {
  display: flex;
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 5px;
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
}

.image {
  text-align: center;
}

.image img {
  max-width: 100%;
  height: auto;
}

.content {
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.content p {
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
}

.content .price {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.agregar {
  padding: 9px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.arrow {
  display: flex;
  flex-direction: column;
  justify-content: column;
  align-items: center;
  width: 100px;
  border-radius: 100px;
}
</style>