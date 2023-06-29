const userStore = {
    usuario: JSON.parse(localStorage.getItem('usuario')) ?? null,

    logearUsuario(usuario) {
        this.usuario = usuario
        localStorage.setItem('usuario', JSON.stringify(usuario));
    },

    cerrarSesion() {
        localStorage.removeItem('usuario')
        this.usuario = null
    },

    agregarPedido(pedido) {
        this.usuario = {
            ...this.usuario,
            misPedidos: [...this.usuario.misPedidos, pedido]
        }
        console.log(this.usuario)
    }
};

export default userStore