<template>
  <div id="app">
  <navbar></navbar>
  <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/Navbar'
export default {
  components:{
    navbar
  },
  name: 'app',
  data(){
    return{

    }
  },
  methods:{
  },
  created: function(){

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
  margin-top: 60px;
}
</style>
