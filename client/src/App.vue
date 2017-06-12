<template>
  <div id="app">
    <Navbar :nilailogin="islogin"></Navbar>
    <router-view :nilailogin="islogin"></router-view>
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
      islogin: false
    }
  },
  created () {
    if (localStorage.getItem('token') !== null) {
      this.islogin = true
    } else {
      this.islogin = false
      this.$router.push("/login")
    }
  }
}
</script>

<style>
#app {

}
</style>
