
<script>
import ArtworkList from '@/components/ArtworkList/index.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimesCircle, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faTimesCircle, faChevronRight, faChevronLeft)

export default {
  name: 'LightBox',
  components: {
    FontAwesomeIcon,
    ArtworkList
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
  data () {
    return {
      observer: null
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
  created () {
    const options = {
      root: this.$el,
      threshold: 0
    }
    this.observer = new IntersectionObserver(this.callback, options)
  },
  beforeDestroy () {
    this.observer.disconnect()
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
    },
    callback (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.setAttribute('src', img.dataset.src)
          img.classList.add('finish')
          img.removeAttribute('data-src')
          this.observer.unobserve(img)
        }
      })
    }
  }
}
</script>

<template src="./template.html" />
<style src ="./style.css" scoped></style>
