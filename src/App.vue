<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
    padding: 0;
    margin: 0
}
html,body{
    height: 100%;  
    width: 100%;
    overflow:hidden;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  height: 100%;  
  width: 100%;
  /*color: #2c3e50;*/
  height: 100%;
}

</style>
