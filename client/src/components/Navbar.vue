<template lang="html">
<body>
<div class="nav">
<nav class="navbar navbar-default navbar-inverse" role="navigation">
<div class="container-fluid">
  <!-- Brand and toggle get grouped for better mobile display -->
  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">Storyoverflow</a>
  </div>

  <!-- Collect the nav links, forms, and other content for toggling -->
  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav">
      <li><a href="/">Home</a></li>
       <!-- class="active" -->
      <li class="dropdown" v-if="isLogin === true">
        <a href="#" class="dropdown-toggle"  data-toggle="dropdown">Profile<span class="caret"></span></a>
        <ul class="dropdown-menu" role="menu" >
          <li><router-link to="/user-stories">{{user.name}}'s Story</router-link></li>
          <li class="divider"></li>
          <li><router-link to="/profile">{{user.name}}'s Profile</router-link></li>
          <!-- <li class="divider"></li>
          <li><a href="#">One more separated link</a></li> -->
        </ul>
      </li>
    </ul>
    <form class="navbar-form navbar-left" role="search">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
    <ul class="nav navbar-nav navbar-right">
      <!-- <li><p class="navbar-text">Already have an account?</p></li> -->
      <a href="#" v-if="isLogin === true" v-on:click="logout()"><b>Logout</b></a>
      <li class="dropdown">    
        <a href="#" v-if="isLogin === false" class="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span class="caret"></span></a>
    <ul id="login-dp" class="dropdown-menu">
      <li>
         <div class="row">
            <div class="col-md-12">
              Login via
              <div class="social-buttons">
                <a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>
                <a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>
              </div>
                              or
               <form id="login-nav">
                   <div class="form-group">
                      <label class="sr-only" for="exampleInputEmail2">Username</label>
                      <input type="text" v-model="username" class="form-control" id="exampleInputEmail2" placeholder="Username" required>
                   </div>
                   <div class="form-group">
                      <label class="sr-only" for="exampleInputPassword2">Password</label>
                      <input type="password" v-model="password" class="form-control" id="exampleInputPassword2" placeholder="Password" required>
                     
                   </div>
                   <div class="form-group">
                      <button type="submit" v-on:click="signin()" class="btn btn-primary btn-block">Sign in</button>
                   </div>
                   <div class="checkbox">       
                     <!-- <label>
                     <input type="checkbox"> keep me logged-in
                     </label> -->
                  </div>
               </form>
            </div>
            <div class="bottom text-center">
              New here ? <a href="#" data-toggle="modal" data-target="#signup-modal"><b>Join Us</b></a>
            </div>
         </div>
      </li>
    </ul>
      </li>
    </ul>
  </div><!-- /.navbar-collapse -->
  <div class="modal fade" id="signup-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
          <div class="modal-dialog">
          <div class="loginmodal-container">
            <h1>Sign Up</h1><br>
            <form>
            <input type="text" v-model="name" placeholder="Name">
            <input type="text" v-model="username" placeholder="Username">
            <input type="password" v-model="password" placeholder="Password">
            <input type="email" v-model="email" placeholder="Email">
            <input type="submit" v-on:click="signup()" class="login loginmodal-submit" value="Sign Up">
            </form>					
            <div class="login-help">
            </div>
          </div>
      </div>
  </div>
  
</div><!-- /.container-fluid -->
</nav>
</div>
</body>
</template>

<script>
export default {
  name: 'navbar',
  data (){
    return {
      isLogin:false,
      name: "",
      username: "",
      password: "",
      email: ""
    }
  },
  methods:{
    checkLogin(){
      var token = localStorage.getItem('token')
      let self = this;
      if(token !== null){
        self.isLogin = true
      }
      else{
        self.isLogin = false
      }
    },
    logout(){
      this.isLogin = false
      localStorage.clear()
      location.reload()
      console.log(`masuk logout`);
    },
    signup(){
      let self = this;
      axios.post(`http://localhost:3000/users/signup`,{
        name: self.name,
        username: self.username,
        password: self.password,
        email: self.email
      })
      .then(response=>{
        alert(`${self.name} Registered!`)
        location.reload()
      })
      .catch(err=>{
        console.log(err);
      })
    },
    signin(){
      let self = this;
      axios.post('http://localhost:3000/users/signin',{
        username: self.username,
        password: self.password
      })
      .then(response=>{
        console.log(typeof(response.data));
        alert(`Welcome to Storyoverflow ${self.username}`)
        localStorage.setItem('token',JSON.stringify(response.data))
         window.location = '/'
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  created: function(){
    this.checkLogin()
  },
  computed:{
    user(){
      var userdata = JSON.parse(localStorage.getItem('token'))
      if(userdata !== null){
        return userdata
      }
    }
  }
}
</script>

<style lang="css" scoped>
body{
    background:url('http://www.wallpaperup.com/uploads/wallpapers/2012/10/21/20181/cad2441dd3252cf53f12154412286ba0.jpg');
    padding:50px;
}

#login-dp{
    min-width: 250px;
    padding: 14px 14px 0;
    overflow:hidden;
    background-color:rgba(255,255,255,.8);
}
#login-dp .help-block{
    font-size:12px    
}
#login-dp .bottom{
    background-color:rgba(255,255,255,.8);
    border-top:1px solid #ddd;
    clear:both;
    padding:14px;
}
#login-dp .social-buttons{
    margin:12px 0    
}
#login-dp .social-buttons a{
    width: 49%;
}
#login-dp .form-group {
    margin-bottom: 10px;
}
.btn-fb{
    color: #fff;
    background-color:#3b5998;
}
.btn-fb:hover{
    color: #fff;
    background-color:#496ebc 
}
.btn-tw{
    color: #fff;
    background-color:#55acee;
}
.btn-tw:hover{
    color: #fff;
    background-color:#59b5fa;
}
@media(max-width:768px){
    #login-dp{
        background-color: inherit;
        color: #fff;
    }
    #login-dp .bottom{
        background-color: inherit;
        border-top:0 none;
    }
}
.loginmodal-container {
  padding: 30px;
  max-width: 350px;
  width: 100% !important;
  background-color: #F7F7F7;
  margin: 0 auto;
  border-radius: 2px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  font-family: roboto;
}

.loginmodal-container h1 {
  text-align: center;
  font-size: 1.8em;
  font-family: roboto;
}

.loginmodal-container input[type=submit] {
  width: 100%;
  display: block;
  margin-bottom: 10px;
  position: relative;
}

.loginmodal-container input[type=text], input[type=password] {
  height: 44px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  /* border-radius: 2px; */
  padding: 0 8px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}


.loginmodal-container input[type=text]:hover, input[type=password]:hover, textarea:hover {
  border: 1px solid #b9b9b9;
  border-top: 1px solid #a0a0a0;
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.loginmodal-container input[type=text], input[type=email] {
  height: 44px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  /* border-radius: 2px; */
  padding: 0 8px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.loginmodal-container textarea {
  height: 100%;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  /* border-radius: 2px; */
  padding: 0 8px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.loginmodal-container input[type=text]:hover, input[type=email]:hover, textarea:hover {
  border: 1px solid #b9b9b9;
  border-top: 1px solid #a0a0a0;
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.loginmodal {
  text-align: center;
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  height: 36px;
  padding: 0 8px;
/* border-radius: 3px; */
/* -webkit-user-select: none;
  user-select: none; */
}

.loginmodal-submit {
  /* border: 1px solid #3079ed; */
  border: 0px;
  color: #fff;
  text-shadow: 0 1px rgba(0,0,0,0.1); 
  background-color: #4d90fe;
  padding: 17px 0px;
  font-family: roboto;
  font-size: 14px;
  /* background-image: -webkit-gradient(linear, 0 0, 0 100%,   from(#4d90fe), to(#4787ed)); */
}

.loginmodal-submit:hover {
  /* border: 1px solid #2f5bb7; */
  border: 0px;
  text-shadow: 0 1px rgba(0,0,0,0.3);
  background-color: #357ae8;
  /* background-image: -webkit-gradient(linear, 0 0, 0 100%,   from(#4d90fe), to(#357ae8)); */
}

.loginmodal-container a {
  text-decoration: none;
  color: #666;
  font-weight: 400;
  text-align: center;
  display: inline-block;
  opacity: 0.6;
  transition: opacity ease 0.5s;
} 

.login-help{
  font-size: 12px;
}

</style>
