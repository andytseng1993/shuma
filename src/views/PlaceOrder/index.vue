
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import VueRecaptcha from 'vue-recaptcha'
import emailjs from 'emailjs-com'
library.add(faPaperPlane, faWind)
export default {
  components: {
    VueRecaptcha,
    FontAwesomeIcon
  },
  data () {
    return {
      show: false,
      formEmpty: false,
      vuerecaptcha: null,
      order: {
        name: '',
        email: '',
        message: '',
        title: [],
        order: '4654632187'
      }
    }
  },
  computed: {
    cartList () {
      return this.$store.state.cartList
    }
  },
  mounted () {
    this.$store.dispatch('READ_SHOPLIST')
  },
  mothods: {
    recaptchaverify (res) {
      this.vuerecaptcha = res
    }
  }
}
</script>

<template src="./template.html" />

<style src='./style.css' scoped/>
