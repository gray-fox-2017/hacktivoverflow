<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  },
  data () {
    return {
      decoded : []
    }
  },
  created () {
    var self = this
    axios.get('http://localhost:3000/api/users/validate',{
      body:{
        token : localStorage.getItem('token')
      }
    })
    .then(response=>{
      self.decodedToken = response.data
      window.location.href = 'http://localhost:8080/#/content'
      console.log(self.decodedToken);
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
</script>

<style>
#app {

}
</style>
