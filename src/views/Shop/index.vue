<script>

import FilterType from '@/components/SelectType/index.vue'
import ShopList from '@/components/ShopList/index.vue'
import Navigation from '@/components/Navigation/index.vue'

export default {
  components: {
    Navigation,
    FilterType,
    ShopList

  },
  computed: {
    engControl () {
      return this.$store.state.engControl
    },
    cartList () {
      return this.$store.state.cartList
    },
    artworks () {
      return this.$store.state.artworks
    },
    type: {
      get () {
        return this.$store.state.type
      },
      set (val) {
        this.$store.commit('SET_TYPE', val)
      }
    },
    isLightboxOpen: {
      get () {
        return this.$store.state.isLightboxOpen
      },
      set (val) {
        this.$store.commit('SET_LIGHTBOX', val)
      }
    },
    nowPlayId: {
      get () {
        return this.$store.state.nowPlayId
      },
      set (val) {
        this.$store.commit('SET_PLAYID', val)
      }
    },
    shoplists () {
      return this.artworks.filter((artwork) => { return artwork.sell === true && artwork.soldOut === false })
    },
    typeList () {
      const obj = {
        sort: [],
        map: { }
      }
      this.shoplists.forEach(({ type, title, thumbnail, src, year, material, size, sell, soldOut, price }, index) => {
        if (!this.engControl) {
          if (!obj.map[type[0]]) {
            obj.sort.push(type[0])
            obj.map[type[0]] = {
              sort: [],
              map: {}
            }
          }
          obj.map[type[0]].sort.push(title[0])
          obj.map[type[0]].map[title[0]] = { index, thumbnail, src, year, material, size, sell, soldOut, price }
        } else {
          if (!obj.map[type[1]]) {
            obj.sort.push(type[1])
            obj.map[type[1]] = {
              sort: [],
              map: {}
            }
          }
          obj.map[type[1]].sort.push(title[1])
          obj.map[type[1]].map[title[1]] = { index, thumbnail, src, year, material, size, sell, soldOut, price }
        }
      })

      return obj
    },
    artworkMenu () {
      if (this.type != null) {
        return this.typeList.map[this.type]
      } else {
        const el = {
          sort: [],
          map: {}
        }
        this.shoplists.forEach(({ title, thumbnail, src, year, material, size, sell, soldOut, price }, index) => {
          if (!this.engControl) {
            el.sort.push(title[0])
            el.map[title[0]] = { title, thumbnail, index, src, year, material, size, sell, soldOut, price }
          } else {
            el.sort.push(title[1])
            el.map[title[1]] = { title, thumbnail, index, src, year, material, size, sell, soldOut, price }
          }
        })
        return el
      }
    }
  },
  watch: {

  },
  mounted () {
    this.$store.dispatch('CLEAR_TYPE')
    this.$store.dispatch('GET_LANGUAGE')
    this.$store.dispatch('GETARTWORK')
    this.$store.dispatch('READ_SHOPLIST')
    this.Scroll()
  },
  methods: {
    addList (val) {
      this.$store.dispatch('CREATE_SHOPLIST', val)
    },
    deleteList (val) {
      this.$store.dispatch('DELETE_SHOPLIST', val)
    },
    date: function () {
      const nowDate = new Date()
      return nowDate.getFullYear()
    },
    Scroll () {
      const el = document.body
      el.classList.remove('noScroll')
    }

  }

}
</script>

<template src="./template.html" />
<style src='./style.css' scoped />
