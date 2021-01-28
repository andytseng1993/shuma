
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faUserCircle, faPalette, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faUserCircle, faPalette, faShoppingCart)

export default {
  components: {
    FontAwesomeIcon
  }

}
</script>
<template src="./template.html" />

<style src="./style.css" scoped/>
