import vue from 'vue'
import router from "../router/index"
import store from "../store";
import { get, post } from '../services/httpService'

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
    await get(import.meta.env.VITE_MOCKAPI_URL_USUARIOS)
        .then((data) => {
            const usuarios = data;

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
                    store.dispatch("userStore/logearUsuario", usuarioEncontrado)
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
        })
        .catch((err) => {
            console.log(err);
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

    await get(import.meta.env.VITE_MOCKAPI_URL_USUARIOS)
        .then((data) => {
            usuariosExistentes = data
        })
        .catch((err) => {
            console.log(err);
        });
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
            misPedidos: []
        };
        await post(import.meta.env.VITE_MOCKAPI_URL_USUARIOS, usuario)
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: `Usuario registrado`,
                });
            })
            .catch((err) => {
                Toast.fire({
                    icon: "error",
                    title: err,
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