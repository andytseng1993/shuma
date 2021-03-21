import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import LocalStorage from '../modules/LocalStorage'
Vue.use(Vuex)

const STORE = new LocalStorage('shopList')

export default new Vuex.Store({
  strict: true,
  state: {
    cartList: [],
    artworks: [],
    engControl: true, // true=eg
    type: null,
    // light box
    isLightboxOpen: false,
    nowPlayId: 0,
    scroll: 0,
    touchDown: 0,
    touchUp: 0
  },
  mutations: {
    SETARTWORK (state, artworks) {
      state.artworks = artworks
    },
    SETTYPE (state, type) {
      state.type = type
    },
    SETLANGUAGE (state, language) {
      state.engControl = language
    },
    SETLIGHTBOX (state, lightbox) {
      state.isLightboxOpen = lightbox
    },
    SETPLAYID (state, id) {
      state.nowPlayId = id
    },
    SET_SHOPLISTS (state, items) {
      state.cartList = items
    }
  },
  actions: {
    GETARTWORK (context) {
      return axios.get('/artwork.json').then(res => {
        context.commit('SETARTWORK', res.data)
      })
    },
    READ_SHOPLIST ({ commit }) {
      const items = STORE.get()
      commit('SET_SHOPLISTS', items)
      return items
    },
    CREATE_SHOPLIST ({ commit }, { item }) {
      const items = STORE.get()
      items.push(item)
      STORE.set(items)
      commit('SET_SHOPLISTS', items)
      return {
        item,
        itemId: items.length - 1
      }
    },
    DELETE_SHOPLIST ({ commit }, { itemId }) {
      const items = STORE.get()
      console.log(itemId)
      const item = items.splice(itemId, 1)[0]
      STORE.set(items)
      commit('SET_SHOPLISTS', items)
      return {
        item
      }
    },
    CLEAR_SHOLIST ({ commit }) {
      const items = []
      STORE.set(items)
      commit('SET_SHOPLISTS', items)
      return {
        items
      }
    }
  },
  modules: {
  }
})
