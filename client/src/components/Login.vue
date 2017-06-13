<template>
  <div class="ui middle aligned center aligned grid ">
    <div class="column">
      <h2 class="ui blue image header">
        <div class="content">
          Log-in to your account
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="username" v-model="user.username" placeholder="Username">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" v-model="user.password" placeholder="Password">
            </div>
          </div>
          <div class="ui fluid large blue submit button" @click="signIn">Login</div>
        </div>

        <div class="ui error message"></div>

      </form>

      <div class="ui message">
        New to us? <a href="#">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:{
        username: '',
        password: ''
      }
    }
  },
  methods:{
    signIn: function(){
      self = this
      axios.post('http://localhost:3000/auth/signin', {
        username:self.user.username,
        password:self.user.password
      })
      .then((response)=>{
        var token = response.data.token
        var user = response.data.username
        console.log(user);
        console.log(token);
        window.localStorage.setItem('token',token)
        window.localStorage.setItem('user', user)
        self.$store.commit('changeIsLogin',true)
        self.$router.push('/')
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },
  created(){
    if(window.localStorage.getItem('token'))
    this.$store.commit('changeIsLogin',true)
    else this.$store.commit('changeIsLogin',false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ui.middle.aligned{
  width: 30%;
  margin-left: 35%;
  margin-top: 3%;
}

</style>
