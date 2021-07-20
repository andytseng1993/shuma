
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons/faInstagramSquare'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare'
import { faArtstation } from '@fortawesome/free-brands-svg-icons/faArtstation'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'

import Navigation from '@/components/Navigation/index.vue'
library.add(faInstagramSquare, faFacebookSquare, faArtstation, faEnvelope)

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
