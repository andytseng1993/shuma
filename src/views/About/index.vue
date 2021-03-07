
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faUserCircle, faPalette, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Navigation from '@/components/Navigation/index.vue'
library.add(faHome, faUserCircle, faPalette, faShoppingCart)

export default {
  components: {
    FontAwesomeIcon,
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
