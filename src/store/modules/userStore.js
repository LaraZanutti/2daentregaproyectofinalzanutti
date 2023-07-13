import axios from "axios";
import router from "../../router";

const userStore = {
    namespaced: true,
    state: {
        usuario: null
    },
    mutations: {
        logearUsuario(state, usuario) {
            state.usuario = usuario
        },

        cerrarSesion(state) {
            state.usuario = null
        },

        async traerPedidosDeUsuario(state, response) {
            const pedidos = response.data.filter(pedido => pedido.usuario.id === state.usuario.id)
            state.usuario = {
                ...state.usuario,
                misPedidos: pedidos
            }
        }
    },
    actions: {
        logearUsuario({ commit }, usuario) {
            commit('logearUsuario', usuario)
        },
        cerrarSesion({ commit }) {
            commit('cerrarSesion')
        },
        async agregarPedido({ commit, state }, pedido) {
            const pedidoConUsuario = {
                ...pedido,
                usuario: {
                    id: state.usuario.id,
                    username: state.usuario.username
                }
            }

            await axios
                .post(import.meta.env.VITE_MOCKAPI_URL_PEDIDOS, pedidoConUsuario)
                .then(() => {
                    router.push({ name: "misPedidos" });
                    commit("productoStore/eliminarTodosLosProductos", null, { root: true })
                })
                .catch((error) => {
                    console.log(error)
                    alert("hubo un error")
                });
        },
        async traerPedidosDeUsuario({ commit }) {
            await axios
                .get(import.meta.env.VITE_MOCKAPI_URL_PEDIDOS)
                .then((response) => {
                    commit('traerPedidosDeUsuario', response)
                })
                .catch((error) => {
                    console.log(error)
                    alert("hubo un error")
                });


        }

    },
    getters: {
        getUsuario(state) {
            return state.usuario
        }
    }
};

export default userStore