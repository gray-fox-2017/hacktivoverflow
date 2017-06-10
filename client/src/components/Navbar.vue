<template>

  <div class="ui secondary menu">
    <a class="ui item" @click="showHome">
      Home
    </a>
    <div class="right menu">
      <a v-if="token" class="ui item" @click="showAkun">
        Akun
      </a>
      <a v-if="token" class="ui item" @click="signOut">
        Logout
      </a>
      <a  v-if="!token" class="ui item" @click="showLogin">
        Signin
      </a>
      <a  v-if="!token" class="ui item" @click="showSignup">
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
      token:window.localStorage.getItem('token') //this.$store.getters.getItem
    }
  },
  computed:{

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
    },
    showAkun(){

    },
    signOut(){
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      this.$router.push('/login','')
      this.$store.dispatch('changeToken')
      location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
