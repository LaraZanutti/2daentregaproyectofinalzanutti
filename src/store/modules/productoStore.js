import vue from "vue";

const productoStore = {
    namespaced: true,
    state: {
        productos: [],
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
        actualizarProducto({ commit, getters }, params) {
            const index = getters.getIndexProducto(params.producto.id)
            const productoActualizado = {
                ...params.producto,
                cantidad: params.cantidadNueva,
                subtotal: params.subtotal
            }
            commit('actualizarProducto', { productoActualizado, index })
            vue.prototype.$toast.fire({
                icon: "success",
                title: `Tiene un total de ${params.cantidadNueva} ${params.producto.producto} en el carrito`,
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
            let total = 0
            state.productos.forEach((producto) => {
                total += producto.subtotal;
            })
            return total
        }
    },
};

export default productoStore