<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <router-link to="/" class="lariz"
          >LariZtore</router-link
        ></b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" class="justify-content-end p-3 ml-4" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <b-button class="carrito" @click="irAlCarrito">
              <b-icon-cart4 />
              <span class="cantidadProductos">{{
                productoStore.productos.length
              }}</span>
            </b-button>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav>
          <router-link to="/sobre-nosotros">
            <b-button class="button">
              <b-icon-info-circle />&nbsp;Sobre nosotros
            </b-button>
          </router-link>
        </b-navbar-nav>

        <b-navbar-nav>
          <router-link to="/login">
            <b-button class="button" v-if="!userStore.usuario">
              <b-icon-person-circle />&nbsp;Login</b-button
            ></router-link
          >
        </b-navbar-nav>

        <b-sidebar
          ref="sidebar"
          id="sidebar-border"
          sidebar-class="border-right border-danger"
          backdrop
          shadow
          right
        >
          <div class="px-3 py-2 d-flex flex-column gap-4">
            <p class="lariz p-0 text-center">LariZtore</p>
            <p class="bienvenido" v-if="userStore.usuario">
              Bienvenido {{ userStore.usuario.username }}
            </p>
            <b-button
              variant="outline-success"
              v-if="userStore.usuario?.isAdmin"
              @click="redirect('agregarProductos')"
              ><b-icon-plus-circle />&nbsp;Agregar producto</b-button
            >
            <b-button
              v-if="!userStore.usuario?.isAdmin"
              class="button m-0"
              @click="redirect('misPedidos')"
              ><b-icon-card-list />&nbsp;Mis pedidos</b-button
            >
            <b-button variant="outline-danger" @click="cerrarSesion"
              ><b-icon-door-open />&nbsp;Cerrar sesión</b-button
            >
          </div>
        </b-sidebar>

        <div>
          <b-button
            class="button"
            v-b-toggle.sidebar-border
            v-if="userStore.usuario"
          >
            <b-icon-person-bounding-box />&nbsp;
            {{ userStore.usuario.username }}
          </b-button>
        </div>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import productoStore from "../store/productoStore";
import userStore from "../store/storeUser";
export default {
  name: "NavBar",

  props: {
    usuarioLogeado: String,
    productos: Array,
  },
  data() {
    return {
      productoStore: productoStore,
      userStore: userStore,
    };
  },
  methods: {
    irAlCarrito() {
      this.$router.push({
        name: "carrito",
      });
    },
    //Emitir activarLogin al app.vue
    activarLogin() {
      this.$emit("activarLogin");
    },
    //Emitir cerrarSesion al app.vue
    cerrarSesion() {
      this.userStore.cerrarSesion();
      this.$refs.sidebar.hide();
      if (this.$route.name !== "home") {
        this.$router.push({
          name: "home",
        });
      }
    },
    //Emitir eliminarTodo al app.vue
    eliminarTodo() {
      this.$emit("eliminarTodo");
    },
    //chimi
    easterEgg() {
      this.$swal.fire({
        html: '<a style="font-size: 30px; color: pink;" href="https://github.com/LaraZanutti" target="_blank">https://github.com/LaraZanutti</a>',
        width: 600,
        padding: "3em",
        showConfirmButton: false,
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `,
      });
    },
    redirect(nombreRuta) {
      this.$router.push({
        name: nombreRuta,
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
a {
  text-decoration: none;
}
:deep .close {
  display: none !important;
}
.lariz {
  color: rgb(244, 147, 215);
  font-family: "Bebas Neue", sans-serif;
  font-size: 40px;
  padding-left: 20px;
}
.button {
  color: rgb(244, 147, 215);
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgb(244, 147, 215);
  margin-right: 4px;
  margin-left: 10px;
}

.bienvenido {
  color: rgb(0, 0, 0);
  font-family: "Bebas Neue", sans-serif;
  text-align: center;
  font-size: 20px;
}

.button:hover {
  background: rgb(244, 147, 215);
  color: white;
}

.carrito {
  color: rgb(244, 147, 215);
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgb(244, 147, 215);
  margin-left: 10px;
  display: flex;
  min-width: 70px;
  gap: 10px;
}

.carrito:hover {
  background: rgb(244, 147, 215);
  color: white;
}

.botonComprar {
  font-size: 20px;
  font-weight: 500;
  display: inline-block;
}

.cantidadProductos {
  min-width: 20px;
  min-height: 20px;
  background: rgb(244, 147, 215);
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}

.cantidadProductos:hover {
  background: white;
  color: rgb(244, 147, 215);
}

.usuario {
  color: rgb(244, 147, 215);
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgb(244, 147, 215);
  display: flex;
  align-items: center;
  font-size: 15px;
  border-radius: 6px;
  gap: 5px;
  padding: 7px;
  margin-top: 2px;
  letter-spacing: 0.3px;
}

.usuario:hover {
  background: rgb(244, 147, 215);
  color: white;
}

.icon {
  min-width: 30px;
  font-size: 1em;
}

.misPedidos {
  text-decoration: none;
  color: black;
}
.agregarProductos {
  text-decoration: none;
  color: black;
}

.dropdown {
  margin-top: 20px;
}

.dropdownPedidos:any-link {
  background: rgb(244, 147, 215) !important;
}

.dropdown-menu .bs-dropdown-link-active-color {
  background: rgb(244, 147, 215) !important;
}
</style>