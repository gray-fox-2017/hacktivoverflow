<template>

  <div class="ui secondary menu">
    <a class="ui item" @click="showHome">
      Home
    </a>
    <div class="right menu">
      <a class="ui item" @click="showLogin">
        Signin
      </a>
      <a class="ui item" @click="showSignup">
        Signup
      </a>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    }
  },
  methods:{
    showLogin(){
      this.$router.push('/login')
    },
    showSignup(){
      this.$router.push('/signUp')
    },
    showHome(){
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
