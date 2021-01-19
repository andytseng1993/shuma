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
html{
  width:100%;
  overflow-x:hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
