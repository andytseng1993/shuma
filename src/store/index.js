import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
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
    }
  },
  actions: {
    GETARTWORK (context) {
      return axios.get('/artwork.json').then(res => {
        context.commit('SETARTWORK', res.data)
      })
    }

  },
  modules: {
  }
})
