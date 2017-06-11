<template>
  <div id="app">
    <!-- for interface in client web browser -->
    <Navbar></Navbar>
    <router-view></router-view>

  </div>
</template>

<script>
// if u want to use import the component

import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
    // ini daftarin components yang mau di pake
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
