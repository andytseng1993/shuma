
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
  },
  mounted () {
    this.canPlay()
    this.image()
  },
  methods: {
    canPlay () {
      const video = document.querySelector('video')
      const videoMobile = document.querySelector('.videoMobile')
      video.addEventListener('canplay', function () {
        setTimeout(function () {
          video.play()
        }, 1900)
      })
      videoMobile.addEventListener('canplay', function () {
        setTimeout(function () {
          videoMobile.play()
        }, 1900)
      })
    },
    image () {
      const width = window.innerWidth
      const bgImage = document.querySelector('.bgImage')
      if (width > 480) bgImage.setAttribute('src', require('../../assets/The-Night-Citizen-big.jpg'))
      else bgImage.setAttribute('src', require('../../assets/The-Night-Citizen-small.jpg'))
      bgImage.onload = function () {
        const preloadBgi = document.querySelector('.preloadBgi')
        preloadBgi.style.opacity = 0
      }
    }
  }
}
</script>
<template src="./template.html" />
<style src="./style.css" scoped/>
