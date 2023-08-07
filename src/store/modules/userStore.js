import { traerPedidos, guardarPedido } from '../../services/pedidosService'

const userStore = {
    namespaced: true,
    state: {
        usuario: null
    },
    getters: {
        getUsuario(state) {
            return state.usuario
        }
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
        cerrarSesion({ commit, dispatch }) {
            dispatch('productoStore/eliminarTodosLosProductos', null, { root: true })
            commit('cerrarSesion')
        },
        async agregarPedido({ state }, pedido) {
            const pedidoConUsuario = {
                ...pedido,
                usuario: {
                    id: state.usuario.id,
                    username: state.usuario.username
                }
            }
            await guardarPedido(pedidoConUsuario)

        },
        async traerPedidosDeUsuario({ commit }) {
            const pedidos = await traerPedidos()
            commit('traerPedidosDeUsuario', pedidos)
        }

    },
};

export default userStore