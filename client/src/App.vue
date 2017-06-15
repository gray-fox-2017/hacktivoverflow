<template>
  <div id="app">
    <navbar id="navbar"></navbar>
      <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

}
#navbar{
  text-align: left;
}
</style>
