
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
  created () {
    this.$store.dispatch('GET_LANGUAGE')
  },
  mounted () {
    this.image()
  },
  methods: {
    image () {
      const width = window.innerWidth
      const selfi = new Image()
      const image = document.querySelector('.image')
      if (width > 1200) image.setAttribute('src', require('../../assets/About_selfie_low.jpg'))
      else if (width > 480 && width <= 1200) image.setAttribute('src', require('../../assets/About_selfie_median_low.jpg'))
      else image.setAttribute('src', require('../../assets/About_selfie_small_low.jpg'))
      image.onload = function () {
        image.classList.add('loading')
      }
      if (width > 1200) selfi.setAttribute('src', require('../../assets/About_selfie.jpg'))
      else if (width > 480 && width <= 1200) selfi.setAttribute('src', require('../../assets/About_selfie_median.jpg'))
      else selfi.setAttribute('src', require('../../assets/About_selfie_small.jpg'))
      selfi.addEventListener('load', function () {
        image.addEventListener('transitionend', image.remove)
        image.classList.add('fade')
      })
    }
  }

}
</script>
<template src="./template.html" />

<style src="./style.css" scoped/>
