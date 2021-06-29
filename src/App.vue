<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>

@font-face {
  font-family:'Press Start 2P';
  src: local("Press Start 2P"), url(~@/assets/fonts/Press_Start_2P/PressStart2P-Regular.ttf) format('truetype');
  font-display: swap;
}

html,body{
  margin: 0%;
  width:100%;
  height: 100%;
}
body.noScroll{
  overflow-y: hidden;
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
