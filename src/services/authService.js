import router from "../router/index"
import store from "../store";
import { get, post } from '../services/httpService'
import vue from "vue";

const { VITE_MOCKAPI_URL_USUARIOS: userUrl } = import.meta.env

const login = async (username, password) => {
    await get(userUrl)
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
                    vue.prototype.$toast.fire({
                        icon: "success",
                        title: `Bienvenido ${usuarioEncontrado.username}`,
                    });
                    store.dispatch("userStore/logearUsuario", usuarioEncontrado)
                    router.push({ name: "home" })
                        .catch(err => { })
                } else {
                    //La contraseña es incorrecta
                    vue.prototype.$toast.fire({
                        icon: "error",
                        title: `Usuario o contraseña incorrecta`,
                    });
                }
            } else {
                //El usuario no existe
                vue.prototype.$toast.fire({
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
        vue.prototype.$toast.fire({
            icon: "error",
            title: `Usuario o contraseña incorrecta`,
        }); return
    }

    let usuariosExistentes = []

    await get(userUrl)
        .then((data) => {
            usuariosExistentes = data
        })
        .catch((err) => {
            console.log(err);
        });
    const usuarioExiste = usuariosExistentes.find(usuario => usuario.username === username)
    if (usuarioExiste) {
        vue.prototype.$toast.fire({
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
        await post(userUrl, usuario)
            .then(() => {
                vue.prototype.$toast.fire({
                    icon: "success",
                    title: `Usuario registrado`,
                });
            })
            .catch((err) => {
                vue.prototype.$toast.fire({
                    icon: "error",
                    title: err,
                });
            });
    } else {
        vue.prototype.$toast.fire({
            icon: "error",
            title: `"Las contraseñas no coinciden"`,
        });
    }
}


export { login, registrar }