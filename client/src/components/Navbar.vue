<template lang="html">
  <div id="app">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <br>
              <h1>Hacktiv-overflow</h1>
            </div>
            <div class="col-md-1">
              <br>
              <a class="navbar-brand" href="#" to="./login">Login</a>
            </div>
            <div class="col-md-1">
              <br>
              <a class="navbar-brand" href="#" to=".register">Register</a>
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
  name: 'Navbar',
  components: {
    Login,
    Register
  }
}
</script>

<style lang="css">
</style>
