
<script>
export default {
  computed: {
    engControl: {
      get () {
        return this.$store.state.engControl
      },
      set (val) {
        this.$store.state.engControl = val
      }
    },
    artworks () {
      return this.$store.state.artworks
    },
    notes () {
      return this.$store.state.notes
    },
    typeListCh () {
      const obj = {
        sort: [],
        map: {}
      }
      this.artworks.forEach(({ type, title, src, year, material, size, sell, soldout, price }, index) => {
        if (!obj.map[type[0]]) {
          obj.sort.push(type[0])
          obj.map[type[0]] = {
            sort: [],
            map: {}
          }
        }
        obj.map[type[0]].sort.push(title[0])
        obj.map[type[0]].map[title[0]] = { index, src, year, material, size, sell, soldout, price }
      })
      return obj
    },
    typeListEg () {
      const obj = {
        sort: [],
        map: {}
      }
      this.artworks.forEach(({ type, title, src, year, material, size, sell, soldout, price }, index) => {
        if (!obj.map[type[1]]) {
          obj.sort.push(type[1])
          obj.map[type[1]] = {
            sort: [],
            map: {}
          }
        }
        obj.map[type[1]].sort.push(title[1])
        obj.map[type[1]].map[title[1]] = { index, src, year, material, size, sell, soldout, price }
      })
      return obj
    }

  },
  mounted () {
    this.$store.dispatch('GETARTWORK')
  }
}
</script>
<template src="./template.html" />
<style  scr="./style.css" scoped></style>
