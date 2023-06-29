import axios from "axios";
import vue from 'vue'
import userStore from "../store/storeUser"
import router from "../router/index"

const Toast = vue.swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", vue.swal.stopTimer);
        toast.addEventListener("mouseleave", vue.swal.resumeTimer);
    },
});

const login = async (username, password) => {
    await axios
        .get("https://6495d71db08e17c91792c061.mockapi.io/users")
        .then((response) => {
            const usuarios = response.data;

            //Buscar el usuario en el array de usuarios mediante el username
            const usuarioEncontrado = usuarios.find(
                (user) =>
                    user.username.toLowerCase() === username.toLowerCase()
            );
            //Si el usuario existe, comprobar si la contraseña es la correcta
            if (usuarioEncontrado) {
                if (usuarioEncontrado.password === password) {
                    Toast.fire({
                        icon: "success",
                        title: `Bienvenido ${usuarioEncontrado.username}`,
                    });
                    userStore.logearUsuario(usuarioEncontrado);
                    router.push({ name: "home" });
                } else {
                    //La contraseña es incorrecta
                    Toast.fire({
                        icon: "error",
                        title: `Usuario o contraseña incorrecta`,
                    });
                }
            } else {
                //El usuario no existe
                Toast.fire({
                    icon: "error",
                    title: `Usuario o contraseña incorrecta`,
                });
            }
        });
}


const registrar = async (username, password, passwordConfirm) => {

    if (username.length < 1) {
        Toast.fire({
            icon: "error",
            title: `Usuario o contraseña incorrecta`,
        }); return
    }

    let usuariosExistentes = []

    await axios
        .get("https://6495d71db08e17c91792c061.mockapi.io/users")
        .then((response) => {
            usuariosExistentes = response.data
        })
    const usuarioExiste = usuariosExistentes.find(usuario => usuario.username === username)
    if (usuarioExiste) {
        Toast.fire({
            icon: "error",
            title: `Este usuario ya existe`
        })
        return
    }

    //Si estamos en modo registro, se valida que las contraseñas sean iguales
    if (password === passwordConfirm) {
        //Enviar this.form a la mockapi como hago en productos
        const usuario = {
            username: username,
            password: password,
            isAdmin: false,
        };
        await axios
            .post("https://6495d71db08e17c91792c061.mockapi.io/users", usuario)
            .then(function () {
                Toast.fire({
                    icon: "success",
                    title: `Usuario registrado`,
                });
            })
            .catch(function (error) {
                Toast.fire({
                    icon: "error",
                    title: error,
                });
            });
    } else {
        Toast.fire({
            icon: "error",
            title: `"Las contraseñas no coinciden"`,
        });
    }
}


export { login, registrar }