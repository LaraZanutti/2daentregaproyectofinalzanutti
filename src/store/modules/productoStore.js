import vue from "vue";

const productoStore = {
    namespaced: true,
    state: {
        productos: [],
    },
    getters: {
        getProductos(state) {
            return state.productos
        },
        getProductoById: (state) => (id) => {
            return state.productos.find(producto => producto.id === id)
        },
        getSubtotalProducto: (state) => (id) => {
            return state.productos.find(producto => producto.id === id).subtotal
        },
        getIndexProducto: (state) => (id) => {
            return state.productos.findIndex(producto => producto.id === id)
        },
        getTotal(state) {
            const total = state.productos.reduce((total, producto) => {
                return total + producto.subtotal
            }, 0)
            return total
        }
    },
    mutations: {
        agregarProducto(state, producto) {
            state.productos.push(producto)
        },

        actualizarProducto(state, { productoActualizado, index }) {
            state.productos.splice(index, 1, productoActualizado)
        },

        eliminarProducto(state, id) {
            state.productos = state.productos.filter(producto => producto.id !== id)
        },

        eliminarTodosLosProductos(state) {
            state.productos = []
        },

        restarCantidadCarrito(state, id) {
            state.productos.find(producto => producto.id === id).cantidad--
        },

        sumarCantidadCarrito(state, id) {
            state.productos.find(producto => producto.id === id).cantidad++
        }
    },
    actions: {
        agregarProducto({ commit, getters, dispatch }, producto) {
            let productoExistente = getters.getProductoById(producto.id)
            if (productoExistente) {
                const cantidadNueva = productoExistente.cantidad + producto.cantidad
                const subtotal = productoExistente.precio * cantidadNueva
                dispatch("actualizarProducto", { producto, cantidadNueva, subtotal })
            } else {
                const productoAgregar = {
                    ...producto,
                    subtotal: producto.cantidad * producto.precio
                }
                commit('agregarProducto', productoAgregar)
                vue.prototype.$toast.fire({
                    icon: "success",
                    title: `Agregaste ${producto.cantidad} ${producto.producto} al carrito`,
                });
            }
        },
        actualizarProducto({ commit, getters }, payload) {
            const index = getters.getIndexProducto(payload.producto.id)
            const productoActualizado = {
                ...payload.producto,
                cantidad: payload.cantidadNueva,
                subtotal: payload.subtotal
            }
            commit('actualizarProducto', { productoActualizado, index })
            vue.prototype.$toast.fire({
                icon: "success",
                title: `Tiene un total de ${payload.cantidadNueva} ${payload.producto.producto} en el carrito`,
            });
        },
        eliminarProducto({ commit }, id) {
            commit('eliminarProducto', id)
        },
        eliminarTodosLosProductos({ commit }) {
            commit('eliminarTodosLosProductos')
        },
        sumarCantidadCarrito({ dispatch, getters }, id) {
            let producto = getters.getProductoById(id)
            const cantidadNueva = producto.cantidad + 1
            const subtotal = producto.precio * cantidadNueva
            dispatch("actualizarProducto", { producto, cantidadNueva, subtotal })
        },
        restarCantidadCarrito({ dispatch, commit, getters }, id) {
            let producto = getters.getProductoById(id)
            const cantidadNueva = producto.cantidad - 1
            if (cantidadNueva === 0) {
                commit('eliminarProducto', id)
                return
            }
            const subtotal = producto.precio * cantidadNueva
            dispatch("actualizarProducto", { producto, cantidadNueva, subtotal })
        }

    },
};

export default productoStore