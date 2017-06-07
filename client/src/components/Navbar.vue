<template lang="html">
  <div>
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><span><img src="http://appicteam.com/assets/images/icons/stackoverflow.png" alt="Logo" style="width:50px;heigth:50px;"></span><b>Hacktiv-Overflow</b></el-menu-item>
      <div class="user_menu" style="float:right" v-show="statusLogin == null">
        <el-menu-item index="1" @click="signInDialog">SignIn</el-menu-item>
        <el-menu-item index="1" @click="signinfb">Signin FB
        </el-menu-item>
        <el-menu-item index="1" @click="signUpDialog">SignUp</el-menu-item>
      </div>

      <el-submenu index="2" style="float:right" v-show="statusLogin">
       <template slot="title">Welcome, {{userActive}}</template>
       <el-menu-item index="2-2">Profile</el-menu-item>
       <el-menu-item index="2-3" @click="signOut">SignOut</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-dialog title="SignUp" v-model="dialogFormVisibleSignup">
      <el-form :model="form_signup">
        <el-form-item>
          <el-input v-model="form_signup.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form_signup.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form_signup.password" placeholder="Password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form_signup.email" placeholder="Email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSignup = false">Cancel</el-button>
        <el-button type="primary" @click="signUp(form_signup);dialogFormVisibleSignup = false;notification('SignUp succes')">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog title="SignIn" v-model="dialogFormVisibleSignin">
      <el-form :model="form_signin">
        <el-form-item>
          <el-input v-model="form_signin.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form_signin.password" placeholder="Password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSignin = false">Cancel</el-button>
        <el-button type="primary" @click="signIn(form_signin);dialogFormVisibleSignin = false;">Confirm</el-button>
      </span>
    </el-dialog>
    <img src="https://geffchang.files.wordpress.com/2012/05/stackoverflow-stickers2.jpg" v-show="statusLogin === null" style="height:600px;width:1270px;opacity:0.4;filter:alpha(opacity=50);">

    <Content v-show="statusLogin"></Content>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Content from './Content'

// Proses login facebook-sdk
window.fbAsyncInit = function() {
  FB.init({
    appId      : '413434489050147',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
    console.log(response);
  });

};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    FB.api('/me', {fields: 'first_name, name, email'}, function (apiResponse) {
      console.log(apiResponse);
      window.localStorage.setItem('token', response.authResponse.accessToken);
      window.localStorage.setItem('uuid', apiResponse.id);
      window.localStorage.setItem('user', apiResponse.first_name);
      window.localStorage.setItem('login_method', 'facebook');
      let url = 'http://localhost:3000/signinfb';
      let body = {
        uuid: apiResponse.id,
        email: apiResponse.email,
        name: apiResponse.name
      }
      console.log('ini data body');
      console.log(body);
      axios.post(url, body)
        .then((res) => {
          console.log('Tessss');
          console.log(res);
          window.localStorage.setItem('id', res.data._id);
           window.location = "/"
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

function fb_login(){
  FB.login(function(response) {
    checkLoginState()
  }, {
    scope: 'email, public_profile, publish_actions'
  });
}

export default {
  components: {
    Content
  },
  data() {
    return {
      form_signup: {
        name: '',
        username: '',
        password: '',
        email: ''
      },
      form_signin: {
        username: '',
        password: ''
      },
      dialogFormVisibleSignup: false,
      dialogFormVisibleSignin: false,
      userActive: ''
    }
  },
  methods: {
    signinfb(){
      fb_login()
    },
    ...mapActions([
      "signIn", "signUp"
    ]),
    signUpDialog(){
      this.dialogFormVisibleSignup = true
    },
    signInDialog(){
      this.dialogFormVisibleSignin = true
    },
    signOut(){
      window.localStorage.clear()
      window.location = "/"
    },
    notification(notif='') {
      if (notif='SignUp succes') {
        this.$message({
          message: 'SignUp succes, you mush signin first!',
          type: 'success'
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      statusLogin: "isLogin"
    })
  },
  created() {
    this.userActive = window.localStorage.getItem('user')
  }
}
</script>

<style lang="css">
  .el-select{
    width: 100%
  }
  .el-card {
    text-align: left;
  }
  .el-menu{
   border: 1px solid #d9d9d9;
  }

</style>
