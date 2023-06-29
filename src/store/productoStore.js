const productoStore = {
    productos: [],

    agregarProducto(producto) {
        const indiceProducto = this.productos.findIndex(prod => prod.id === producto.id)
        if (indiceProducto !== -1) {
            this.productos[indiceProducto].cantidad += producto.cantidad
        } else { this.productos.push(producto) };
    },

    eliminarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id)
    },

    eliminarTodosLosProductos() {
        this.productos = []
    }
};

export default productoStore