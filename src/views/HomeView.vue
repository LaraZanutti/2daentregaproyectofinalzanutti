<template>
  <div>
    <div class="spinner d-flex justify-content-center mb-3 align-items-center" v-if="loading">
      <b-spinner variant="light"></b-spinner>
    </div>
    <ContainerProductos :productos="productos" @actualizarLista="traerProductos" v-else />
  </div>
</template>

<script>
import ContainerProductos from "../components/ContainerProductos.vue";
import { get } from '../services/httpService'

export default {
  name: "HomeView",
  components: {
    ContainerProductos,
  },
  data() {
    return {
      productos: [],
      users: [],
      loading: false,
    };
  },
  created() {
    this.traerProductos();
  },
  methods: {

    async traerProductos() {
      this.loading = true;
      const { VITE_MOCKAPI_URL_PRODUCTOS: productUrl } = import.meta.env
      await get(productUrl)
        .then((data) => {
          this.productos = data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style>
.spinner {
  min-height: 100vh;
  padding-top: 40px;
}
</style>