const productoStore = {
    namespaced: true,
    state: {
        productos: [],
    },
    mutations: {
        agregarProducto(state, producto) {
            const indiceProducto = state.productos.findIndex(prod => prod.id === producto.id)
            if (indiceProducto !== -1) {
                state.productos[indiceProducto].cantidad += producto.cantidad
            } else { state.productos.push(producto) };
        },

        eliminarProducto(state, id) {
            state.productos = state.productos.filter(producto => producto.id !== id)
        },

        eliminarTodosLosProductos(state) {
            state.productos = []
        }
    },
    actions: {
        agregarProducto({ commit }, producto) {
            commit('agregarProducto', producto)
        },
        eliminarProducto({ commit }, id) {
            commit('eliminarProducto', id)
        },
        eliminarTodosLosProductos({ commit }) {
            commit('eliminarTodosLosProductos')
        }

    },
    getters: {
        getProductos(state) {
            return state.productos
        }
    },
};

export default productoStore