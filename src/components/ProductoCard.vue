<template>
  <div>
    <b-card
      :title="producto.title"
      :img-src="producto.thumbnail"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2 card"
    >
      <b-card-text class="precio">
        {{ `$ ${producto.price}` }}
      </b-card-text>

      <div>
        <b-input-group class="mt-3">
          <b-input-group-prepend>
            <b-button @click="restarProducto" variant="outline-danger"
              ><b-icon-patch-minus
            /></b-button>
          </b-input-group-prepend>
          <b-form-input
            class="text-center"
            v-model="cantidadProducto"
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="sumarProducto" variant="outline-success"
              ><b-icon-patch-plus
            /></b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <b-button
        :disabled="cantidadProducto === 0"
        class="mt-4"
        @click="agregarCarrito"
        variant="success"
        >Agregar al carrito</b-button
      >

      <div class="detalle">
        <b-button
          ><router-link
            :to="`/descripcion-producto/${producto.id}`"
            class="descripcion"
          >
            Ver descripción</router-link
          ></b-button
        >
      </div>

      <div class="botones">
        <router-link :to="`/editar-producto/${producto.id}`"
          ><b-button class="brush" v-if="getUsuario?.isAdmin"
            ><b-icon-brush
          /></b-button>
        </router-link>
        <b-button
          class="trash"
          @click="eliminarProducto(producto.id)"
          v-if="getUsuario?.isAdmin"
          ><b-icon-trash
        /></b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ProductoCard",
  props: {
    producto: Object,
  },
  data() {
    return {
      cantidadProducto: 0,
    };
  },
  computed: {
    ...mapGetters("userStore", ["getUsuario"]),
  },
  methods: {
    ...mapActions("productoStore", ["agregarProducto"]),

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
    async eliminarProducto(id) {
      const toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
      await axios
        .delete(
          `${import.meta.env.VITE_MOCKAPI_URL_PRODUCTOS}/${id}`,
          this.form
        )
        .then(function () {
          toast.fire({
            icon: "success",
            title: `Producto eliminado`,
          });
        })
        .catch(function (error) {
          toast.fire({
            icon: "error",
            title: error,
          });
        });
      this.$emit("actualizarLista");
    },
  },
};
</script>

<style>
.precio {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 25px;
}
.card {
  width: 300px;
  text-align: center;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.4px);
  -webkit-backdrop-filter: blur(8.4px);
}

.card-img-top {
  height: 15vw;
  object-fit: cover;
  width: 100%;
}

.detalle {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}

.descripcion {
  text-decoration: none;
  background: grey;
  color: white;
  background: none;
}

.botones {
  gap: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.brush {
  margin-bottom: 10px;
  margin-top: 10px;
  width: 50px;
  background: rgb(210, 135, 245);
  border: black;
}

.trash {
  width: 50px;
  background: rgb(236, 115, 115);
  border: black;
}
</style>