<template lang="html">
  <div id="app">
    <!-- {{ questions }} -->
    <div class="container" v-for="question in questions">
      <div class="row">
        <div class="col-md-1">
          <div class="votes">
            <h1>votes</h1>
            <a class="vote-up-off"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png" alt="vote-up"></a>
            <h1>{{ question.upvotes.length - question.downvotes.length }}</h1>
            <a href="" class="vote-up-off"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" alt="vote-up"></a>
          </div>
        </div>
        <div class="col-md-10">
          <div class="container" >
          	<div class="span8">
              <hr>
                  <h1>{{ question.title }}</h1>
                  <article class="article">
                    <p>{{ question.body }}</p>
                    <p text-align="left">
                    createdAt : {{ question.createdAt}} <br>
                    updatedAt : {{ question.updatedAt}}
                    </p>
                  </article>
                  <div>
                    <h4>asked by: {{ question.creator }}</h4>
                      <div class="more label"><a href="#">Read more</a></div>
                      <div class="tags">
                          <span class="btn-info" ><a href="#">javascript</a></span><span class="btn-info"><a href="#">nodejs</a></span><span class="btn-info"><a href="#">regex</a></span>
                      </div>


                  </div>

                  <div class="clear"></div>
                  <div class="container">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1">
                          <div class="votes">
                            <h3>votes</h3>
                            <a class="vote-up-off"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png" alt="vote-up"></a>
                            <h1>{{ question.upvotes.length - question.downvotes.length }}</h1>
                            <a href="" class="vote-up-off"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" alt="vote-up"></a>
                          </div>
                        </div>
                        <div class="answer col-md-11" >
                          <h3>answer</h3>
                          <hr>
                            <h1>{{ question.answersBody }}</h1>
                            <article class="article">
                              <p>{{ question._id }}</p>
                            </article>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="comment">
                <!-- <span><a class="btn " href="#">Comment</a></span> -->
                <p class="btn-info text-left" @click="comment(question._id)"><a href="#" class="btn btn-default btn-sm"><i class="fa fa-reply"></i> reply</a></p>

                <div class="" v-if="status_comment == question._id">
                  <div class="col">
                    <div class="panel-body">
                      <form role="form">
                        <fieldset>
                          <div class="form-group">
                            <textarea class="form-control" rows="3" placeholder="Write in your wall" autofocus=""></textarea>
                          </div>
                          <button @click="postComment(question._id)" type="submit" class="[ btn btn-success ]" data-loading-text="Loading...">Post reply</button>
                        </fieldset>
                      </form>
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
  props:['questions'],
  data () {
    return {
      status_comment : "",
      id_question: "",
      id_user: ""
    }
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
