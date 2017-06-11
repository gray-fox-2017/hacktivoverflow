<template lang="html">
  <div id="app">
    <div class="container">
      <h1>LOGIN HERE</h1>
      <br>
      <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
          <b-form-input v-model='username' type="text" placeholder="Enter your username"></b-form-input>
          <br>
          <b-form-input v-model='password' type="password" placeholder="Enter your password"></b-form-input>
          <br>
          <div class="row">
            <template v-for="variant in ['success']">
              <div class="col-md-12">
                <b-button :variant="variant" @click="signin()">
                  SIGN IN
                </b-button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      text: '',
      username: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    msgClear () {
      this.msg = ''
    },
    signin () {
      axios.post('http://localhost:3000/api/signin', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        this.email = ''
        this.password = ''
        if (response.data.hasOwnProperty('msg')) {
          this.msg = response.data.msg
        } else {
          var token = response.data.token
          localStorage.setItem('token', token)
          window.location.href = 'http://localhost:8080/#/home'
          location.reload()
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
