<script>
export default {
  name: 'ArtworkList',
  props: {
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
    artwork: {
      type: String,
      required: true
    },
    observer: {
      type: IntersectionObserver,
      required: true
    }

  },
  computes: {

  },
  mounted () {
    this.observer.observe(this.$el)
  },
  methods: {
    setPlayId (id) {
      this.$emit('update:nowPlayId', id)
    },
    controlLightBox (val) {
      this.$emit('update:isLightboxOpen', val)
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
