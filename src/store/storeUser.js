const userStore = {
    usuario: JSON.parse(localStorage.getItem('usuario')) ?? null,
    misPedidos: [],

    logearUsuario(usuario) {
        this.usuario = usuario
        localStorage.setItem('usuario', JSON.stringify(usuario));
    },

    cerrarSesion() {
        this.usuario = null
    },

    agregarPedido(pedido) {
        this.misPedidos.push(pedido)
    }
};

export default userStore