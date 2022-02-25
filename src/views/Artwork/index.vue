
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

    typeList () {
      const obj = {
        sort: [],
        map: { }
      }
      this.artworks.forEach(({ thumbnail, type, title, src, year, material, size }, index) => {
        thumbnail = thumbnail.trim()
        src = src.trim()
        size = size.trim()
        if (!this.engControl) {
          type[0] = type[0].trim()
          title[0] = title[0].trim()
          if (!obj.map[type[0]]) {
            obj.sort.push(type[0])
            obj.map[type[0]] = {
              sort: [],
              map: {}
            }
          }
          obj.map[type[0]].sort.push(title[0])
          obj.map[type[0]].map[title[0]] = { index, thumbnail: thumbnail, src, year, material: material[0].trim(), size }
        } else {
          type[1] = type[1].trim()
          title[1] = title[1].trim()
          if (!obj.map[type[1]]) {
            obj.sort.push(type[1])
            obj.map[type[1]] = {
              sort: [],
              map: {}
            }
          }
          obj.map[type[1]].sort.push(title[1])
          obj.map[type[1]].map[title[1]] = { index, thumbnail, src: src, year, material: material[1].trim(), size }
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
        this.artworks.forEach(({ title, thumbnail, src, year, material, size }, index) => {
          src = src.trim()
          thumbnail = thumbnail.trim()
          size = size.trim()
          if (!this.engControl) {
            title[0] = title[0].trim()
            el.sort.push(title[0])
            el.map[title[0]] = { index, thumbnail, src, year, material, size }
          } else {
            title[1] = title[1].trim()
            el.sort.push(title[1])
            el.map[title[1]] = { index, thumbnail, src, year, material, size }
          }
        })
        return el
      }
    }

  },
  watch: {

  },
  created () {
    this.$store.dispatch('GETARTWORK')
    this.$store.dispatch('GET_LANGUAGE')
    this.$store.dispatch('CLEAR_TYPE')
    this.Scroll()
  },
  methods: {
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
<style  src="./style.css" scoped></style>
