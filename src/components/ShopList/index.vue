
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimesCircle, faChevronRight, faChevronLeft, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
library.add(faTimesCircle, faChevronRight, faChevronLeft, faShoppingBasket)

export default {
  name: 'ShopList',
  components: {
    FontAwesomeIcon
  },
  props: {
    isLightboxOpen: {
      type: Boolean,
      required: true
    },
    artworkMenu: {
      type: Object,
      required: true
    },
    engControl: {
      type: Boolean,
      required: true
    },
    nowPlayId: {
      type: Number,
      required: true
    },
    cartList: {
      type: Array,
      default: null
    }
  },
  computed: {
    total () {
      return this.artworkMenu.sort.length
    },
    selectArtwork () {
      return this.artworkMenu.sort[this.nowPlayId]
    },
    artworkDetail () {
      return this.artworkMenu.map[this.selectArtwork]
    },
    artworkMaterials () {
      if (this.engControl) return this.artworkDetail.material[1]
      else return this.artworkDetail.material[0]
    },
    subTotal () {
      return this.cartList.map(workart => workart.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }
  },
  methods: {
    bgcss (url) {
      return { 'background-image': 'url(' + url + ')' }
    },
    setPlayId (id) {
      this.$emit('update:nowPlayId', id)
    },
    controlLightBox () {
      this.$emit('update:isLightboxOpen', !this.isLightboxOpen)
    },
    change (val) {
      this.setPlayId((val + this.total) % this.total)
    },
    addList (val) {
      const list = this.artworkMenu.map[val]
      this.$emit('add-to-cart', { item: list })
    },
    deleteList (val) {
      this.$emit('delete-list', { itemId: val })
    },
    value (val) {
      console.log(val)
    },
    price (val) {
      if (val === null) return 0
      else return val.toLocaleString('en')
    }

  }
}
</script>

<template src="./template.html" />
<style src ="./style.css" scoped></style>
