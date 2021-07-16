<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted () {
    this.resizeEvent()
  },
  created () {
    window.addEventListener('resize', this.resizeEvent)
  },
  beforeDestroy () {
    window.addEventListener('resize', this.resizeEvent)
  },
  methods: {
    resizeEvent () {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
}
</script>
<style>
@font-face {
    font-family: 'Press Start 2P';
    src:
        url(~@/assets/fonts/Nav/PressStart2P-Regular.woff) format('woff'),
        url(~@/assets/fonts/Nav/PressStart2P-Regular.woff2) format('woff2'),
        url(~@/assets/fonts/Nav/PressStart2P-Regular.ttf) format('truetype');
}
html,body{
  margin: 0%;
  width:100%;
}
body {
  height: 100vh;
  /* mobile viewport bug fix */
  height: calc(var(--vh, 1vh) * 100);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent;
}
body.noScroll{
  position:relative;
  overflow-y: hidden;
  touch-action: none;
  -ms-touch-action: none;
}
body{
  overflow-x: hidden;
}
::-webkit-scrollbar {
 width: 8px;
}
::-webkit-scrollbar-thumb {
 background: #b4b4b4;
 border-radius: 15px;
}
::-webkit-scrollbar-thumb:hover{
 background: #7c7c7c;
}
::-webkit-scrollbar-track{
 background: #ffffff;
 border-radius: 15px;
 box-shadow: inset 7px 10px 12px #f0f0f0;
}
::-webkit-scrollbar-track:hover{
  background: #d3d3d3;
}
#app {
  color: #2c3e50;
  width:100%;
  height: 100%;
}

#nav {
  padding: 15px 0px;
}

#nav a {
  margin: 0px 5px;
  font-weight: bold;
  color: #2c3e50;
  font-size: 23px;
}

</style>
