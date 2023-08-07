import { get, post } from '../services/httpService'
import router from '../router';
import store from '../store';


const { VITE_MOCKAPI_URL_PEDIDOS: pedidosUrl } = import.meta.env

const traerPedidos = async () => {
    return await get(pedidosUrl)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

const guardarPedido = async (pedidoConUsuario) => {
    await post(pedidosUrl, pedidoConUsuario)
        .then(() => {
            router.push({ name: "misPedidos" }).catch(err => { })
            store.commit("productoStore/eliminarTodosLosProductos", null, { root: true })
        })
        .catch((err) => {
            console.log(err)
            alert("hubo un error")
        });
}
export { traerPedidos, guardarPedido }