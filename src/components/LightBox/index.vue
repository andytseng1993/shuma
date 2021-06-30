
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimesCircle, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faTimesCircle, faChevronRight, faChevronLeft)

export default {
  name: 'LightBox',
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
      default: function () {
        return {}
      }
    },
    engControl: {
      type: Boolean,
      required: true
    },
    nowPlayId: {
      type: Number,
      required: true
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
    }
  },
  methods: {
    bgcss (url) {
      return { 'background-image': 'url(' + require('@/assets/thumbnail/' + url) + ')' }
    },
    setPlayId (id) {
      this.$emit('update:nowPlayId', id)
    },
    controlLightBox (val) {
      this.$emit('update:isLightboxOpen', val)
    },
    change (val) {
      this.setPlayId((val + this.total) % this.total)
    },
    preload (val) {
      const num = (val + this.total) % this.total
      return this.artworkMenu.map[this.artworkMenu.sort[num]]
    },
    lightboxNoScroll (val) {
      const el = document.body
      if (val === 'add') {
        el.classList.add('noScroll')
      } else {
        el.classList.remove('noScroll')
      }
    }

  }
}
</script>

<template src="./template.html" />
<style src ="./style.css" scoped></style>
