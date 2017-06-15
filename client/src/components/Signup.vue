<template>
  <div class="ui middle aligned center aligned grid ">
    <div class="column">
      <h2 class="ui blue image header">
        <div class="content">
          Sign-up
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="name" v-model="user.name" placeholder="Name">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="mail icon"></i>
              <input type="email" name="email" v-model="user.email" placeholder="Email Address">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="at icon"></i>
              <input type="text" name="usernma" v-model="user.username" placeholder="Username">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" v-model="user.password" placeholder="Password">
            </div>
          </div>
          <button class="ui fluid large blue submit button" @click="signUp">Signup</button>
        </div>

        <div class="ui error message">test</div>

      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Signup',
  data() {
    return {
      user: {
        name: '',
        email: '',
        username: '',
        password:''
      }
    }
  },
  methods:{
    signUp(){
      let self=this;
      console.log(this.user);
      axios.post('http://localhost:3000/auth/signup',{
        name:self.user.name,
        email:self.user.email,
        username:self.user.username,
        password:self.user.password
      })
      .then((response) =>{
        if (response.data.hasOwnProperty('error')) {
          console.log(response.data.error);
        }else {
          console.log(response.data);
          this.$router.push('/login')
        }
      })
    }
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
