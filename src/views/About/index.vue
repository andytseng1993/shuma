
<script>
import Navigation from '@/components/Navigation/index.vue'
export default {
  components: {
    Navigation
  },
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
