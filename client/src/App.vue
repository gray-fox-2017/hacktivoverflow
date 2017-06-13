<template>
  
  <main>
    <div id="app">
      <header>
        <img-header></img-header>
        <header-bar></header-bar>
      </header>
      <router-view></router-view>

      <footer-bar></footer-bar>
    </div>
  </main>

</template>

<script>
import ImgHeader from './components/ImgHeader'
import HeaderBar from './components/HeaderBar'
import FooterBar from './components/FooterBar'

export default {
  name: 'app',
  components: {
    HeaderBar,ImgHeader,FooterBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  bottom: 0px
}


</style>
