<script>
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWind, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import VueRecaptcha from 'vue-recaptcha'
import emailjs from 'emailjs-com'
import Navigation from '@/components/Navigation/index.vue'
library.add(faPaperPlane, faWind, faChevronLeft)
export default {
  components: {
    Navigation,
    VueRecaptcha,
    FontAwesomeIcon
  },
  data () {
    return {
      show: false,
      formEmpty: false,
      order: {
        name: '',
        email: '',
        message: ''
      }
    }
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
  watch: {
  },
  mounted () {
    this.$store.dispatch('GET_LANGUAGE')
    this.focusInput()
  },
  methods: {
    focusInput () {
      this.$refs.name.focus()
    },
    recaptchaverify (res) {
      this.recaptchaVerifyKey = res
    },
    send () {
      if (this.order.name && this.order.email && this.recaptchaVerifyKey) {
        emailjs.send(process.env.VUE_APP_EMAILJS_SERVICE_ID, process.env.VUE_APP_EMAILJS_TEMPALTE_ID, this.order, process.env.VUE_APP_EMAILJS_USER_ID).then(function (response) {
          console.log('SUCCESS!', response.status, response.text)
        }, function (error) {
          console.log('FAILED...', error)
        })
        axios({
          method: 'post',
          url: process.env.VUE_APP_URL,
          params: {
            secret: process.env.VUE_APP_SECRETKEY,
            response: this.recaptchaVerifyKey
          }
        }).then(function () {
          console.log('SUCCESS!')
        })
          .catch(function (error) {
            console.log(error)
          })
        this.show = true
        window.setTimeout(() => {
          this.$router.push('/about')
        }, 4000)
      } else {
        this.formEmpty = true
      }
    },
    async recaptcha () {
      // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoad()

      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha('login')

      // Do stuff with the received token.
    }
  }
}
</script>

<template src="./template.html" />
<style src="./style.css" scoped></style>
