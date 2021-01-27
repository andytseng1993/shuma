
<script>
export default {
  computed: {
    engControl: {
      get () {
        return this.$store.state.engControl
      },
      set (val) {
        this.$store.commit('SETLANGUAGE', val)
      }
    }
  }
}
</script>
<template src="./template.html" />
<style src="./style.css" scoped/>
