
<script>
import ArtworkList from '@/components/ArtworkList/index.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
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
      observer: null,
      load: false
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
          img.previousElementSibling.classList.add('loading')
          img.setAttribute('src', img.dataset.src)
          img.removeAttribute('data-src')
          img.addEventListener('load', this.removeMockup)
          img.classList.add('finish')
          this.observer.unobserve(img)
        }
      })
    },
    removeMockup (event) {
      const mackup = event.target.previousElementSibling
      mackup.addEventListener('transitionend', function () {
        mackup.remove()
      })
      mackup.classList.remove('loading')
      mackup.classList.add('fade')
    },
    loadingImg (id) {
      this.load = true
      const vm = this
      const img = document.getElementById('myPaint')
      img.addEventListener('load', function () {
        vm.load = false
        const image1 = new Image()
        const image2 = new Image()
        image1.setAttribute('src', require('@/assets/img/' + vm.preload(id + 1).src))
        image2.setAttribute('src', require('@/assets/img/' + vm.preload(id - 1).src))
      }, { once: true })
    },
    clickImage (id) {
      this.load = true
      const vm = this
      const image = new Image()
      image.setAttribute('src', require('@/assets/img/' + this.preload(id).src))
      image.addEventListener('load', function () {
        const image1 = new Image()
        const image2 = new Image()
        image1.setAttribute('src', require('@/assets/img/' + vm.preload(id + 1).src))
        image2.setAttribute('src', require('@/assets/img/' + vm.preload(id - 1).src))
        vm.load = false
      }, { once: true })
    }
  }
}
</script>

<template src="./template.html" />
<style src ="./style.css" scoped></style>
