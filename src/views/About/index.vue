
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagramSquare, faFacebookSquare, faArtstation } from '@fortawesome/free-brands-svg-icons'

import Navigation from '@/components/Navigation/index.vue'
library.add(faInstagramSquare, faFacebookSquare, faArtstation)

export default {
  components: {
    FontAwesomeIcon,
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
