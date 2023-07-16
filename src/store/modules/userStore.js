import router from "../../router";
import { get, post } from '../../services/httpService'

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

        async traerPedidosDeUsuario(state, data) {
            const pedidos = data.filter(pedido => pedido.usuario.id === state.usuario.id)
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
            await post(import.meta.env.VITE_MOCKAPI_URL_PEDIDOS, pedidoConUsuario)
                .then(() => {
                    router.push({ name: "misPedidos" })
                        .catch(err => { })
                    commit("productoStore/eliminarTodosLosProductos", null, { root: true })
                })
                .catch((err) => {
                    console.log(err)
                    alert("hubo un error")
                });
        },
        async traerPedidosDeUsuario({ commit }) {
            await get(import.meta.env.VITE_MOCKAPI_URL_PEDIDOS)
                .then((data) => {
                    commit('traerPedidosDeUsuario', data)
                })
                .catch((err) => {
                    console.log(err)
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