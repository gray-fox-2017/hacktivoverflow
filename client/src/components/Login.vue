<template lang="html">
  <div id="app">
    <div class="container">
      <h1>LOGIN HERE</h1>
      <br>
      <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1" style="width: 100px;">Username</span>
            <input v-model="username" type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
          </div>
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1" style="width: 100px;">Password</span>
            <input  type="password" v-model="password" class="form-control" placeholder="password" aria-describedby="basic-addon1">
          </div>

          <br>
          <button class="col-md-12" type="submit" style="height:30px;" @click="signin()">LOGIN</button>

        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signin () {
      this.axios.post('http://localhost:3000/api/signin', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        this.username = ''
        this.password = ''
        if (response.data.hasOwnProperty('msg')) {
          this.msg = response.data.msg
        } else {
          var token = response.data.token
          console.log('Hi Erwin !',response.data);
          localStorage.setItem('token', token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('email', response.data.email)
          this.$router.push("/")
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
