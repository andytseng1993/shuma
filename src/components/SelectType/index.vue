
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
    typeMenu: {
      type: Array,
      required: true
    }
  },
  computed: {
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
