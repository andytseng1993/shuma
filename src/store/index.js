import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artworks: [],
    engControl: true,
    // filter datatype
    // filterCh: "全部",
    show: 'All',
    // light box
    notes: {},
    isLightboxOpen: false,
    now_play_id: 0,
    scroll: 0,
    touchDown: 0,
    touchUp: 0
  },
  mutations: {
    SETARTWORK (state, artworks) {
      state.artworks = artworks
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
