<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import FilterType from '@/components/SelectType/index.vue'
import ShopList from '@/components/ShopList/index.vue'
import Navigation from '@/components/Navigation/index.vue'
library.add(faShoppingCart)

export default {
  components: {
    Navigation,
    FilterType,
    ShopList,
    FontAwesomeIcon
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
        this.$store.commit('SETTYPE', val)
      }
    },
    isLightboxOpen: {
      get () {
        return this.$store.state.isLightboxOpen
      },
      set (val) {
        this.$store.commit('SETLIGHTBOX', val)
      }
    },
    nowPlayId: {
      get () {
        return this.$store.state.nowPlayId
      },
      set (val) {
        this.$store.commit('SETPLAYID', val)
      }
    },
    shoplists () {
      return this.artworks.filter((artwork) => { return artwork.sell === true })
    },
    typeList () {
      const obj = {
        sort: [],
        map: { }
      }
      this.shoplists.forEach(({ type, title, src, year, material, size, sell, soldout, price }, index) => {
        if (!this.engControl) {
          if (!obj.map[type[0]]) {
            obj.sort.push(type[0])
            obj.map[type[0]] = {
              sort: [],
              map: {}
            }
          }
          obj.map[type[0]].sort.push(title[0])
          obj.map[type[0]].map[title[0]] = { index, src, year, material, size, sell, soldout, price }
        } else {
          if (!obj.map[type[1]]) {
            obj.sort.push(type[1])
            obj.map[type[1]] = {
              sort: [],
              map: {}
            }
          }
          obj.map[type[1]].sort.push(title[1])
          obj.map[type[1]].map[title[1]] = { index, src, year, material, size, sell, soldout, price }
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
        this.shoplists.forEach(({ title, src, year, material, size, sell, soldout, price }, index) => {
          if (!this.engControl) {
            el.sort.push(title[0])
            el.map[title[0]] = { title, index, src, year, material, size, sell, soldout, price }
          } else {
            el.sort.push(title[1])
            el.map[title[1]] = { title, index, src, year, material, size, sell, soldout, price }
          }
        })
        return el
      }
    }
  },
  watch: {

  },
  mounted () {
    this.$store.dispatch('GET_LANGUAGE')
    this.$store.dispatch('GETARTWORK')
    this.$store.dispatch('READ_SHOPLIST')
  },
  methods: {
    addList (val) {
      this.$store.dispatch('CREATE_SHOPLIST', val)
    },
    deleteList (val) {
      this.$store.dispatch('DELETE_SHOPLIST', val)
    }

  }

}
</script>

<template src="./template.html" />
<style src='./style.css' scoped />
