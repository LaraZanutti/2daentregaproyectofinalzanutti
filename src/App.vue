<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background: #b56b97;
}

body {
  background: #b56b97 !important;
}
</style>
