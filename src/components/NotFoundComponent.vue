<template>
  <div class="container">
    <b-icon icon="exclamation-triangle-fill"></b-icon>
    <h1 class="error">Error 404: Página no encontrada</h1>
    <p class="explicacion">La página que estás buscando no existe.</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error {
  color: brown;
  font-weight: 700;
}

.b-icon {
  color: brown;
  font-size: 60px;
}
</style>