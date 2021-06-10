
<script>
import FilterType from '@/components/SelectType/index.vue'
import LightBox from '@/components/LightBox/index.vue'
import Navigation from '@/components/Navigation/index.vue'

export default {
  components: {
    Navigation,
    FilterType,
    LightBox
  },
  computed: {
    engControl () {
      return this.$store.state.engControl
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

    typeList () {
      const obj = {
        sort: [],
        map: { }
      }
      this.artworks.forEach(({ type, title, src, year, material, size, sell, soldout, price }, index) => {
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
        this.artworks.forEach(({ title, src, year, material, size, sell, soldout, price }, index) => {
          if (!this.engControl) {
            el.sort.push(title[0])
            el.map[title[0]] = { index, src, year, material, size, sell, soldout, price }
          } else {
            el.sort.push(title[1])
            el.map[title[1]] = { index, src, year, material, size, sell, soldout, price }
          }
        })
        return el
      }
    }

  },
  watch: {

  },
  mounted () {
    this.$store.dispatch('GETARTWORK')
    this.$store.dispatch('GET_LANGUAGE')
  },
  methods: {
    date: function () {
      const nowDate = new Date()
      return nowDate.getFullYear()
    }
  }

}
</script>

<template src="./template.html" />
<style  src="./style.css" scoped></style>
