<template>
  <div id="app">
    <mylayout/>
  </div>
</template>
<script>

import mylayout from './components/Layout.vue'

export default {
  name: 'App',
  components: {
    mylayout
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
}
</style>
