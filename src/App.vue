<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: 'Gugi';
  src: local("Gugi"),
  url(./fonts/Gugi/Gugi-Regular.ttf) format('truetype');
  }
@font-face {
  font-family:'Press Start 2P';
  src: local("Press Start 2P"), url(./fonts/Press_Start_2P/PressStart2P-Regular.ttf) format('truetype');
}
@font-face {
  font-family:'SweiAliasSans' ;
  src: local('SweiAliasSans'),url(./fonts/CJK_TC/SweiAliasSansCJKtc-Bold.ttf) format('truetype');
}
@font-face {
  font-family:'Taipei Sans';
  src:  local('Taipei Sans'),url(./fonts/Taipei_Sans _TC/TaipeiSansTCBeta-Regular.ttf) format('truetype');
  font-weight: normal;
}

html,body{
  margin: 0%;
  width:100%;
  height: 100%;
  overflow-x:hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
