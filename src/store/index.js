import Vue from 'vue'
import Vuex from 'vuex'
import productoStore from './modules/productoStore'
import userStore from './modules/userStore'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        productoStore,
        userStore
    }
})