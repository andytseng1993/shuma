
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
        message: '',
        title: []
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
      return this.cartList.map(workart => workart.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }
  },
  watch: {
    cartList: {
      immediate: true,
      handler: function (newartworks, oldartworks) {
        this.order.title = []
        this.cartList.forEach(({ title }) => {
          this.order.title.push(title[1])
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch('READ_SHOPLIST')
    this.$store.dispatch('GET_LANGUAGE')
  },
  methods: {
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
    sendEmail () {
      emailjs.send('service_hd39hf4', 'template_6ngi6cd', this.order, 'user_XiclrBTze0zEbsO6pBizA').then(function (response) {
        console.log('SUCCESS!', response.status, response.text)
      }, function (error) {
        console.log('FAILED...', error)
      })
      this.order.name = null
      this.order.email = null
      this.order.message = null
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
            alert(error)
          })
        this.order.name = null
        this.order.email = null
        this.order.message = null
        this.recaptchaVerifyKey = ''
        this.show = true
        window.setTimeout(() => {
          this.$router.push('/')
          this.show = false
        }, 3000)
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

<style src='./style.css' scoped/>
