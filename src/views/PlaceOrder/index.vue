
<script>
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWind } from '@fortawesome/free-solid-svg-icons/faWind'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
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
      cartEmpty: false,
      order: {
        name: '',
        email: '',
        message: '',
        title: [],
        price: [],
        total: ''
      }
    }
  },
  computed: {
    cartList () {
      return this.$store.state.cartList
    },
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
    },
    subTotal () {
      if (this.engControl) {
        return this.cartList.map(workart => workart.price[1]).reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0)
      } else {
        return this.cartList.map(workart => workart.price[0]).reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0)
      }
    }
  },
  watch: {
    cartList: {
      immediate: true,
      handler: function (newartworks, oldartworks) {
        this.order.title = []
        this.order.price = []
        this.order.total = ''
        if (this.engControl) {
          this.cartList.forEach(({ title, price }) => {
            this.order.title.push(title[1])
            this.order.price.push(price[1])
          })
        } else {
          this.cartList.forEach(({ title, price }) => {
            this.order.title.push(title[0])
            this.order.price.push(price[0])
          })
        }
        this.order.total = this.subTotal
      }
    }
  },
  mounted () {
    this.$store.dispatch('READ_SHOPLIST')
    this.$store.dispatch('GET_LANGUAGE')
    this.focusInput()
    this.reCaptchaOnFocus()
    this.Scroll()
  },
  methods: {
    goBack () {
      return this.$router.go(-1)
    },
    focusInput () {
      this.$refs.name.focus()
    },
    recaptchaverify (res) {
      this.recaptchaVerifyKey = res
    },
    price (val) {
      if (val === null) return 0
      else return val.toLocaleString('en')
    },
    deleteList (val) {
      this.$store.dispatch('DELETE_SHOPLIST', val)
    },
    clear () {
      this.$store.dispatch('CLEAR_SHOLIST')
      this.$emit('update:recaptchaVerifyKey', '')
    },
    send () {
      if (this.order.name && this.order.email && this.recaptchaVerifyKey && this.order.title.length) {
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
        this.clear()
        this.show = true
        window.setTimeout(() => {
          this.$router.push('/')
        }, 4500)
      } else if (this.order.title.length === 0 && this.recaptchaVerifyKey === '') {
        this.formEmpty = true
        this.cartEmpty = true
      } else if (this.recaptchaVerifyKey === '') {
        this.formEmpty = true
      } else {
        this.cartEmpty = true
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
    },
    Scroll () {
      const el = document.body
      el.classList.remove('noScroll')
    }
  }
}
</script>

<template src="./template.html" />

<style src='./style.css' scoped/>
