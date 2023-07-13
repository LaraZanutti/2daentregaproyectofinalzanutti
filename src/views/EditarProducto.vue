<template>
  <div class="container">
    <b-card bg-variant="light" class="card">
      <b-form-group
        label-cols-lg="3"
        label="Editar producto"
        label-size="lg"
        label-class="title font-weight-bold pt-0 text-center d-flex justify-content-center w-100 mb-4"
      >
        <b-form-group
          label="Titulo"
          label-for="titulo"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input v-model="form.title" id="nested-street"></b-form-input>
        </b-form-group>

        <b-form-group
          label="Descripción"
          label-for="descripcion"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            v-model="form.description"
            id="nested-city"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Precio"
          label-for="precio"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            type="number"
            v-model="form.price"
            id="nested-state"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Link de imágen"
          label-for="nested-country"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            v-model="form.thumbnail"
            id="nested-country"
          ></b-form-input>
        </b-form-group>

        <b-button @click="volverALaLista" variant="warning" class="button mt-4"
          >Volver a la lista</b-button
        >
        <b-button @click="editarProducto" variant="success" class="button mt-4"
          >Editar</b-button
        >
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditarProducto",
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
  async created() {
    await this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      axios
        .get(
          `${import.meta.env.VITE_MOCKAPI_URL_PRODUCTOS}/${
            this.$route.params.id
          }`
        )
        .then((res) => {
          const producto = res.data;

          this.form.title = producto.title;
          this.form.description = producto.description;
          this.form.price = producto.price;
          this.form.thumbnail = producto.thumbnail;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editarProducto() {
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
        .put(
          `${import.meta.env.VITE_MOCKAPI_URL_PRODUCTOS}/${
            this.$route.params.id
          }`,
          this.form
        )
        .then(() => {
          toast.fire({
            icon: "success",
            title: `Producto editado`,
          });
          this.$router.push({ name: "home" });
        })
        .catch(function (error) {
          toast.fire({
            icon: "error",
            title: error,
          });
        });
    },
    volverALaLista() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
.button {
  margin-right: 10px;
  color: white;
}
.title {
  text-align: center;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.card {
  font-weight: bold;
  width: 500px;
}

.form-control {
  border: 1px solid #b56b97 !important;
  background: #c39cb4 !important;
  color: white !important;
}
</style>