
<script>
export default {
  computed: {
    engControl: {
      get () {
        return this.$store.state.engControl
      },
      set (val) {
        this.$store.dispatch('SET_LANGUAGE', val)
      }
    }
  },
  created () {
    this.$store.dispatch('GET_LANGUAGE')
  }
}
</script>
<template src="./template.html" />
<style src="./style.css" scoped/>
