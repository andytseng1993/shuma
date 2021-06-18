import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import LocalStorage from '../modules/LocalStorage'
import LocalStorageEngControl from '../modules/LocalStorageEngControl'
Vue.use(Vuex)

const ENG = new LocalStorageEngControl('language')
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
    touchUp: 0,
    recaptcha: ''
  },
  mutations: {
    SET_ARTWORK (state, artworks) {
      state.artworks = artworks
    },
    SET_TYPE (state, type) {
      state.type = type
    },
    SET_LANGUAGE (state, val) {
      state.engControl = val
    },
    SET_LIGHTBOX (state, lightbox) {
      state.isLightboxOpen = lightbox
    },
    SET_PLAYID (state, id) {
      state.nowPlayId = id
    },
    SET_SHOPLISTS (state, items) {
      state.cartList = items
    },
    SET_RECAPTCHA (state, val) {
      state.recaptcha = val
    }
  },
  actions: {
    GETARTWORK (context) {
      return axios.get('./artwork.json').then(res => {
        context.commit('SET_ARTWORK', res.data)
      })
    },
    GET_LANGUAGE ({ commit }) {
      const val = ENG.get()
      commit('SET_LANGUAGE', val)
      return val
    },
    SET_LANGUAGE ({ commit }, value) {
      ENG.set(value)
      commit('SET_LANGUAGE', value)
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
    },
    CLEAR_TYPE ({ commit }) {
      const type = null
      commit('SET_TYPE', type)
    }
  },
  modules: {
  }
})
