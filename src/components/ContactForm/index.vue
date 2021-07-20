
<script>
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWind } from '@fortawesome/free-solid-svg-icons/faWind'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
import VueRecaptcha from 'vue-recaptcha'
import emailjs from 'emailjs-com'
library.add(faPaperPlane, faWind, faChevronLeft)
export default {
  name: 'ContactForm',
  components: {
    VueRecaptcha,
    FontAwesomeIcon
  },
  props: {
    engControl: {
      type: Boolean,
      required: true
    },
    recaptchaVerifyKey: {
      type: String,
      default: ''
    }
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
  mounted () {
    this.focusInput()
    this.reCaptchaOnFocus()
  },
  methods: {
    focusInput () {
      this.$refs.name.focus()
    },
    recaptchaverify (res) {
      this.$emit('update:recaptchaVerifyKey', res)
    },
    clear () {
      this.$emit('update:recaptchaVerifyKey', '')
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
          this.clear()
        }, 4000)
      } else {
        this.formEmpty = true
      }
    },
    reCaptchaOnFocus () {
      var head = document.getElementsByTagName('head')[0]
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit'
      script.defer = true
      head.appendChild(script)
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

<template
  src="./template.html"
  template
/>
<style
  src='./style.css'
  scoped
></style>
