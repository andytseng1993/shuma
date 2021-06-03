
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faUserCircle, faPalette, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faUserCircle, faPalette, faShoppingCart)

export default {
  name: 'Navigation',
  components: {
    FontAwesomeIcon
  },
  props: {
    engControl: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

}
</script>
<template src="./template.html" />
<style src ="./style.css" scoped></style>
