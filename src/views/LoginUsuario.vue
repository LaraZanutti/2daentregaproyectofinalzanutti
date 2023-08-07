<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div class="cuadrado">
      <span class="tituloLogin">{{ registro ? "registrarme" : "login" }}</span>
      <b-form>
        <b-form-input class="mb-3" id="username" v-model="form.username" type="text"
          placeholder="Ingrese nombre de usuario" :state="registro ? validation : Boolean(form.username.length)"
          required></b-form-input>
        <b-form-input class="mb-3" id="password" v-model="form.password" type="password" placeholder="Ingrese contraseña"
          :state="registro ? validationPassword : Boolean(form.password.length)" required></b-form-input>
        <b-form-input v-if="registro" id="passwordConfirm" v-model="form.passwordConfirm" type="password"
          :state="validationPasswordIguales" placeholder="Contraseña de confirmación" required></b-form-input>
        <b-tooltip v-if="registro" target="username" triggers="focus" variant="info" placement="right">
          El usuario debe tener de 4 a 13 carácteres
        </b-tooltip>
        <b-tooltip v-if="registro" target="password" triggers="focus" variant="info" placement="right">
          La contraseña debe tener 6 carácteres, por lo menos 1 número y no puede contener símbolos
        </b-tooltip>
        <b-tooltip v-if="registro" target="passwordConfirm" triggers="focus" variant="info" placement="right">
          Las contraseñas tienen que ser iguales
        </b-tooltip>
      </b-form>
      <b-button @enter="authHandler" @click="authHandler" :disabled="registro ? hayErrorRegistro : hayErrorLogin"
        class="ingresar">{{
          registro ? "Registrarme" : "Ingresar"
        }}</b-button>
      <p class="registrate" @click="cambiarVista">
        {{
          registro
          ? "¿Ya tenés usuario? Ingresa"
          : "¿Todavía no sos usuario? Registrate"
        }}
      </p>
    </div>
  </div>
</template>

<script>
import { login, registrar } from "../services/authService.js";
export default {
  name: "LoginUsuario",
  data() {
    return {
      form: {
        username: "",
        password: "",
        passwordConfirm: "",
      },
      registro: false,
    };
  },
  computed: {

    validation() {
      return this.form.username.length > 4 && this.form.username.length < 13
    },
    validationPassword() {
      const numberRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
      return numberRegex.test(this.form.password);
    },
    validationPasswordIguales() {
      return Boolean(this.form.password.length) && this.form.password === this.form.passwordConfirm
    },
    hayErrorRegistro() {
      return (
        !this.validation ||
        !this.validationPassword ||
        !this.validationPasswordIguales
      )
    },
    hayErrorLogin() {
      return !this.form.username.length || !this.form.password.length
    }
  },
  methods: {

    login,
    registrar,
    authHandler() {
      if (this.registro) {
        registrar(
          this.form.username,
          this.form.password,
          this.form.passwordConfirm
        );
      } else {
        login(this.form.username, this.form.password);
      }
      this.form = {
        username: "",
        password: "",
        passwordConfirm: "",
      };
    },
    //Resetea todos los valores cuando cambiamos de vista
    cambiarVista() {
      this.form = {
        username: "",
        password: "",
        passwordConfirm: "",
      };
      this.registro = !this.registro;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.login {
  height: 100vh;
  background-image: linear-gradient(to bottom,
      #f493d7,
      #b56b97,
      #77475e,
      #3d262f,
      #000000);
}

.tituloLogin {
  display: flex;
  justify-content: center;
  color: white;
  font-family: "Bebas Neue", sans-serif;
  height: 20%;
  font-size: 60px;
  align-items: center;
}

.cuadrado {
  width: 40%;
  min-height: 40%;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  gap: 30px;
}

.ingresar {
  color: white;
  background: rgb(244, 147, 215);
  border: 1px solid rgb(244, 147, 215);
}

.ingresar:hover {
  background: rgb(237, 88, 192);
  color: white;
}

.registrate {
  color: white;
  text-decoration: underline;
  cursor: pointer;
}

.registrate:hover {
  color: rgb(244, 147, 215);
  transform: scale(1.1);
  text-decoration: none;
}

.error {
  display: flex;
  justify-content: center;
  color: white;
  font-family: "Bebas Neue", sans-serif;
  font-size: 25px;
  align-items: center;
  padding: 15px;
}
</style>