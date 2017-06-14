<template>
  <div id="app">
    <app-nav></app-nav>
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppNav from './components/template/AppNav'

export default {
  name: 'app',
  components: {
    AppNav
  }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}*/
</style>
