
<script>
import Navigation from '@/components/Navigation/index.vue'
export default {
  components: {
    Navigation
  },
  computed: {
    engControl () {
      return this.$store.state.engControl
    }
  },
  mounted () {
    this.$store.dispatch('GET_LANGUAGE')
  }

}
</script>
<template src="./template.html" />

<style src="./style.css" scoped/>
