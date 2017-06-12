<template lang="html">
  <div id="app">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="container" v-if="nilailogin == true">
          <div class="row">
            <div class="col-md-8">
              <br>
              <h1>Hacktiv-overflow</h1>
            </div>
            <div class="col-md-2">
              <br>
              <h5 class="navbar-brand">welcome, {{ name }}</h5>
            </div>
            <div class="col-md-2">
              <br>
              <a class="navbar-brand" @click="logout()">logout</a>
            </div>
          </div>

        </div>
        <div class="container" v-else>
          <div class="row">
            <div class="col-md-8">
              <br>
              <h1>Hacktiv-overflow</h1>
            </div>

            <div class="col-md-1">
              <br>
              <router-link class="navbar-brand" to="./login">Login</router-link>
            </div>
            <div class="col-md-1">
              <br>
              <router-link class="navbar-brand" to="./register">Register</router-link>
            </div>
          </div>

        </div>
      </div><!-- /.container-fluid -->
    </nav>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
  props: ['nilailogin'],
  data () {
    return {
      islogin: false,
      name: ''
    }
  },
  name: 'Navbar',
  components: {
    Login,
    Register
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push("/login")
    }
  },
  created () {
    if (localStorage.getItem('token') !== null) {
      this.islogin == true
      this.name = localStorage.getItem('username')
    }
  }
}
</script>

<style lang="css">
</style>
