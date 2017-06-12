<template>
  <div id="app">
    <NavBar :user="user"></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  components: {
    NavBar
  },
  name: 'app',
  data () {
    return {
      token: null,
      user: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    getToken () {
      this.token = localStorage.getItem('token')
    },
    getUserData () {
      var self = this
      this.axios.post('http://localhost:3000/getdata', {
        token: self.token
      })
      .then(function (response) {
        self.user = response.data
      })
    }
  },
  created () {
    this.getToken()
    this.getUserData()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
