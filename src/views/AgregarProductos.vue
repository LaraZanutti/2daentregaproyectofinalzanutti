<template>
  <div class="container">
    <b-form-group label="Agregar producto" class="title"> </b-form-group>

    <b-card bg-variant="light" class="card">
      <b-form-group label="Titulo" label-for="titulo" label-cols-sm="3" label-align-sm="right">
        <b-form-input v-model="form.title" id="nested-street"></b-form-input>
      </b-form-group>

      <b-form-group label="Descripción" label-for="descripcion" label-cols-sm="3" label-align-sm="right">
        <b-form-input v-model="form.description" id="nested-city"></b-form-input>
      </b-form-group>

      <b-form-group label="Precio" label-for="precio" label-cols-sm="3" label-align-sm="right">
        <b-form-input v-model="form.price" type="number" id="nested-state"></b-form-input>
      </b-form-group>

      <b-form-group label="Link de imagen" label-for="nested-country" label-cols-sm="3" label-align-sm="right">
        <b-form-input v-model="form.thumbnail" id="nested-country"></b-form-input>
      </b-form-group>

      <b-button @click="agregarNuevoProducto" class="button">Agregar</b-button>
    </b-card>
  </div>
</template>

<script>
import { post } from '../services/httpService'
export default {
  name: "AgregarProductos",
  data() {
    return {
      form: {
        title: "",
        description: "",
        price: "",
        thumbnail: "",
      },
    };
  },
  methods: {
    async agregarNuevoProducto() {
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

      await post(import.meta.env.VITE_MOCKAPI_URL_PRODUCTOS, this.form)
        .then(() => {
          toast.fire({
            icon: "success",
            title: `Producto agregado`,
          });
          this.$router.push({ name: "home" }).catch(err => { })
        })
        .catch((err) => {
          toast.fire({
            icon: "error",
            title: err,
          });
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.form-control {
  border: 1px solid #b56b97 !important;
  background: #c39cb4 !important;
  color: white !important;
}

.title {
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: "Bebas Neue", sans-serif;
  margin-top: 20px;
  font-weight: 800;
  font-size: 60px;
  color: white;
}

.container {
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.card {
  margin-top: 10px;
  font-weight: bold;
  width: 500px;
  text-align: center;
}

.button {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 9px;
  margin-top: 20px;
  color: white;
  background: rgb(86, 153, 86);
  border: none;
}

.button:hover {
  background: rgb(70, 123, 70);
  color: white;
}
</style>