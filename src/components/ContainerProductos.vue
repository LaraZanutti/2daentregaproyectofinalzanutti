<template>
  <div class="container d-flex flex-wrap justify-content-center gap-3 pt-4">
    <!-- Se loopean todos los productos con su productocard -->
    <ProductoCard
      v-for="producto in productos"
      :key="producto.id"
      :producto="producto"
      @actualizarLista="actualizarLista"
    />
  </div>
</template>

<script>
import ProductoCard from "../components/ProductoCard.vue";
export default {
  name: "ContainerProductos",
  components: {
    ProductoCard,
  },
  props: {
    productos: Array,
  },
  methods: {
    actualizarLista() {
      this.$emit("actualizarLista");
    },
  },
};
</script>

<style>
</style>