import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginUsuario.vue')
    },
    {
      path: '/sobre-nosotros',
      name: 'sobre-nosotros',
      component: () => import('../views/SobreNosotros.vue')
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CarritoCompras.vue')
    },
    {
      path: '/mis-pedidos',
      name: 'misPedidos',
      component: () => import('../views/MisPedidos.vue')
    },
    {
      path: '/agregar-productos',
      name: 'agregarProductos',
      component: () => import('../views/AgregarProductos.vue'),
      beforeEnter(to, from, next) {
        const usuario = store.getters["userStore/getUsuario"]
        if (usuario && usuario.isAdmin) {
          next()
        } else {
          router.push({ name: 'home' })
        }
      }
    },
    {
      path: '/descripcion-producto/:id',
      name: 'descripcionProducto',
      component: () => import('../views/DescripcionProducto.vue')
    },
    {
      path: '/editar-producto/:id',
      name: 'editarProducto',
      component: () => import('../views/EditarProducto.vue'),
      beforeEnter(to, from, next) {
        const usuario = store.getters["userStore/getUsuario"]
        if (usuario && usuario.isAdmin) {
          next()
        } else {
          router.push({ name: 'home' })
        }
      }
    },
    {
      path: '/todosLosPedidos',
      name: 'todosLosPedidos',
      component: () => import('../views/TodosLosPedidos.vue'),
      beforeEnter(to, from, next) {
        const usuario = store.getters["userStore/getUsuario"]
        if (usuario && usuario.isAdmin) {
          next()
        } else {
          router.push({ name: 'home' })
        }
      }
    },
    {
      path: '*',
      component: () => import('../components/NotFoundComponent.vue')
    }
  ]
})

export default router
