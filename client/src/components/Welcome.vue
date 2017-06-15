<template lang="html">
  <div id="app">
    <!-- {{ questions }} -->
    <h1 style="margin-left:140px">Top Questions</h1>
    <hr style="width:80%">
    <div class="container" v-for="question in questions">
      <div class="row">
        <hr>
        <div class="col-md-12">

          <div class="col-md-1">
            <div class="votes">
              <h5>votes</h5>
              <h5>{{ question.upvotes.length - question.downvotes.length }}</h5>
            </div>
          </div>
          <div class="col-md-1">
            <div class="votes">
              <h5>answer</h5>
              <h5>{{ question.upvotes.length - question.downvotes.length }}</h5>
            </div>
          </div>

          <div class="col-md-10">
            <div class="container" >
            	<div class="span8">
              <hr>
                <h1>{{ question.title }}</h1>
                <div>
                  <div class="more label"><a href="#">Read more</a></div>
                  <div class="tags">
                      <span class="btn-info" ><a href="#">javascript</a></span><span class="btn-info"><a href="#">nodejs</a></span><span class="btn-info"><a href="#">regex</a></span>
                  </div>
                </div>
              </div>
            </div>
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
      status_comment : "",
      id_question: "",
      id_user: "",
      questions: []
    }
  },
  created () {
    // this.getQuestion()
    this.questions = this.getQuestion()
    console.log('Hi Token !',localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.islogin == true
    }
    // else {
    //   // window.alert('login please')
    //   window.location = "/login"
    // }

  },
  methods: {
    comment (id) {
      this.status_comment = id
    },
    postComment (id) {
      var self = this
      self.id_question= self.status_comment
      console.log('this is id !! ',self.id_question);
      self.id_user = localStorage.getItem('username')
      axios.post('http://localhost:3000/api/questions/'+self.id_question+'/answer', {
        answersBody: self.answersBody
      }, {
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      })
    },
    getQuestion: function() {
      var self = this
      self.home = true
      axios.get('http://localhost:3000/api/questions', {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
      .then(function(response) {
        self.questions = response.data
        console.log(JSON.stringify(response.data));

      })
      .catch(function(err) {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>
.clear {
  clear:both;
}
.btn-info {
  margin-right:15px;
  text-transform:uppercase;
  padding:10px;
  display:block;
  float:left;
}
.btn-info a {
  display:block;
  text-decoration:none;
  width:100%;
  height:100%;
  color:#fff;
}
.more.label {
  float:right;
}
.article {
  font-size: 12px;
}
.tags {

}
span {
  width: auto;
  height: auto;
}
.votes {
  margin-top: 15px;

}
.btn-info {
  color: #33658a !important;
  background-color: #cee0ed;
}
.vote-up-off, img {
  height: auto;
  width: 25px;
  margin-left: -3px;
}
a {
  color: #33658a !important;
}
span8 {
  background-color: #eff0f1;
}
article {
  background-color: #eff0f1;
}
h4 {
  background-color: #E0EAF1;
  width: auto;
}
</style>
