<script>
import ContactForm from '@/components/ContactForm/index.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faChevronLeft)
export default {
  components: {
    FontAwesomeIcon,
    ContactForm
  },
  computed: {
    recaptchaVerifyKey: {
      get () {
        return this.$store.state.recaptcha
      },
      set (val) {
        this.$store.commit('SET_RECAPTCHA', val)
      }
    },
    engControl () {
      return this.$store.state.engControl
    }
  },
  mounted () {
    this.$store.dispatch('GET_LANGUAGE')
  },
  methods: {
  }
}
</script>

<template src="./template.html" />
<style src="./style.css" scoped></style>
