import vue from "vue";
const productoStore = {
    namespaced: true,
    state: {
        productos: [],
    },
    mutations: {
        agregarProducto(state, producto) {
            const toast = vue.swal.mixin({
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
            const indiceProducto = state.productos.findIndex(prod => prod.id === producto.id)
            if (indiceProducto !== -1) {
                state.productos[indiceProducto].cantidad += producto.cantidad
                state.productos[indiceProducto].subtotal += producto.subtotal
            } else { state.productos.push(producto) };
            toast.fire({
                icon: "success",
                title: `Agregaste ${producto.cantidad} ${producto.producto} al carrito`,
            });
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