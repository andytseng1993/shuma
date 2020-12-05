
<script>
export default {
  name: 'FilterType',
  props: {
    filterType: {
      type: String,
      default: null
    },
    engControl: {
      type: Boolean,
      required: true
    },
    artworks: {
      type: Array,
      required: true
    }
  },
  computed: {
    typeList () {
      const obj = {
        sort: [],
        map: { }
      }
      this.artworks.forEach(({ type, title }) => {
        if (!this.engControl) {
          if (!obj.map[type[0]]) {
            obj.sort.push(type[0])
            obj.map[type[0]] = []
          }
          obj.map[type[0]].push(title[0])
        } else {
          if (!obj.map[type[1]]) {
            obj.sort.push(type[1])
            obj.map[type[1]] = []
          }
          obj.map[type[1]].push(title[1])
        }
      })
      return obj
    },
    selectAll () {
      if (this.engControl) return 'All'
      else return '全部'
    }

  },
  methods: {
    chooseType (val) {
      this.$emit('update:filterType', val)
    }
  }

}
</script>

<template src="./template.html" />
<style src ="./style.css" scoped></style>
