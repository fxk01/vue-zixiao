<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  @import "assets/css/commen.css";

  body {
    margin: 0;
    padding: 0;
  }
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  ul li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .el-popover{
    width: 75px;
    padding: 0;
    text-align: center;
    min-width: 20px !important;
  }

  .body-warpper{
    min-height: 1800px;
  }
</style>
