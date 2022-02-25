
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
      const preloadBgi = document.querySelector('.preloadBgi')
      const image = document.querySelector('.image')
      if (width > 1200) preloadBgi.setAttribute('src', require('../../assets/About_selfie_low.jpg'))
      else if (width > 480 && width <= 1200) preloadBgi.setAttribute('src', require('../../assets/About_selfie_median_low.jpg'))
      else preloadBgi.setAttribute('src', require('../../assets/About_selfie_small_low.jpg'))
      preloadBgi.onload = function () {
        preloadBgi.classList.add('loaded')
        if (width > 1200) image.setAttribute('src', require('../../assets/About_selfie.jpg'))
        else if (width > 480 && width <= 1200) image.setAttribute('src', require('../../assets/About_selfie_median.jpg'))
        else image.setAttribute('src', require('../../assets/About_selfie_small.jpg'))
        image.addEventListener('load', function () {
          preloadBgi.addEventListener('transitionend', preloadBgi.remove)
          preloadBgi.classList.add('fade')
        }, { once: true })
      }
    }
  }

}
</script>
<template src="./template.html" />

<style src="./style.css" scoped/>
