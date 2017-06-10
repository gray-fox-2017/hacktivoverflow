<template lang="html">
  <div class="container">
      <div class="col-md-12 col-sm-12 col-xs-12" id="head">
            <h3>Stories</h3>
      </div>
<div class="container">
  <div class="row ">
    <div v-if="isRead === true">
      <button type="button" v-on:click="cancelRead()" class="cancel btn btn-danger">Cancel</button>
      <h1>{{title}}</h1>
      <h3>{{story}}</h3>
    </div>
<!-- bootsnipp Circle Menu -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-5715866801509976"
     data-ad-slot="3922266447"
     data-ad-format="auto"></ins>
<br>
<br>
    <div class="col-lg-12">
      <div>
        <div class="col-md-4" v-for="(story,index) in stories">
          <h2>{{story.upvote.length - story.downvote.length}}</h2>
          <div class="profile-card text-center">
            <div class="profile-info">
              <p class ="creator">{{story.creator}}</p>
              <h2 class="hvr-underline-from-center">{{story.title}}<span><br>{{story.premise}}</span></h2>
              <p class="note">{{story.note}}</p>
                <br>
                <div><button type="button" v-on:click="readStory(story._id)" class="btn btn-success">Read Story</button></div>
                <br>
                <div><button type="button" class="btn btn-primary" v-on:click="listComment(story._id,index)">Comments</button></div>
            </div>
            <a class=" vote btn btn-default" v-if="story.upvote.indexOf(user._id) === -1" v-on:click="like(story._id,index,user._id)"><span class="glyphicon glyphicon-thumbs-up"></span></a>
            <a class=" vote btn btn-success" v-if="story.upvote.indexOf(user._id) !== -1"><span class="glyphicon glyphicon-thumbs-up"></span>Liked</a>
            <a class=" vote btn btn-default" v-if="story.downvote.indexOf(user._id) === -1" v-on:click="dislike(story._id,index,user._id)"><span class="glyphicon glyphicon-thumbs-down"></span></a>
            <a class=" vote btn btn-danger" v-if="story.downvote.indexOf(user._id) !== -1"><span class="glyphicon glyphicon-thumbs-down"></span>Disliked</a>
            <!-- <a class=" vote btn btn-success" v-else><span class="glyphicon glyphicon-ok"></span>Voted</a> -->                              
            <div class="comment-section" v-if="isComment === true && currentComment === story._id">
              <button type="button" class="cla btn btn-danger" v-on:click="closeComment()">X</button>
                 <div class="comments-list" v-for="(idea,index) in ideas" >
                   <hr class="line">
                   <h4>{{idea.upvote.length - idea.downvote.length}}</h4>
                   <h4><b>{{idea.creator}}</b></h4>
                   <p>{{idea.idea}}</p>
                   <p class="creator">{{idea.createdAt}}</p>
                   <a class=" btn btn-default" v-if="idea.upvote.indexOf(user._id) === -1" v-on:click="likeIdea(idea._id,index,user._id)"><span class="glyphicon glyphicon-thumbs-up"></span></a>
                   <a class=" btn btn-success" v-if="idea.upvote.indexOf(user._id) !== -1"><span class="glyphicon glyphicon-thumbs-up"></span>Liked</a>
                   <a class=" btn btn-default" v-if="idea.downvote.indexOf(user._id) === -1" v-on:click="dislikeIdea(idea._id,index,user._id)"><span class="glyphicon glyphicon-thumbs-down"></span></a>
                   <a class=" btn btn-danger" v-if="idea.downvote.indexOf(user._id) !== -1"><span class="glyphicon glyphicon-thumbs-down"></span>Disliked</a>
                   <a v-if="idea.user_id === user._id" v-on:click="confirmDelCom(idea._id,index)" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-trash"></span></a>
                   <a v-if="idea.user_id === user._id" class="btn btn-sm btn-info" v-on:click="onEditComment(idea._id,index)"><span class="glyphicon glyphicon-pencil"></span></a>
                   <form v-if="currentCommentIndex === idea._id">
                     <textarea class="editcomment" rows="7" v-model="editIdea" placeholder="edit comment"></textarea>
                     <br>
                     <button type="button" class="cl btn btn-danger" v-on:click="closeEditComment()">X</button>
                     <button type="button" class="btn btn-sm btn-primary" v-on:click="editComment(idea._id,index)">Edit</button>
                   </form>
                 </div>
                 <br>
              <textarea type="text" v-model="idea" rows="7" placeholder="Add Comment"></textarea><br>
              <button type="button" class="addComment btn btn-sm btn-primary" v-on:click="createComment(story._id)">Comment</button>  
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
  name:'stories',
  data(){
    return{
      stories:[],
      isRead:false,
      title: "",
      story: "",
      isComment: false,
      ideas: [],
      idea:"",
      currentComment:"",
      currentCommentIndex:"",
      editIdea:""
    }
  },
  methods:{
    listStories(){
      let self = this;
      axios.get('http://localhost:3000/story/list')
      .then(response=>{
        self.stories = response.data
      })
      .catch(err=>{
        console.log(err);
      })
    },
    readStory(id){
      let self = this;
      axios.get(`http://localhost:3000/one/${id}`)
      .then(response=>{
        self.title = response.data.title
        self.story = response.data.story
        self.isRead = true
      })
      .catch(err=>{
        console.log(err);
      })
    },
    cancelRead(){
      this.title = ""
      this.story = ""
      this.isRead = false
    },
    like(id,index,user_id){
      let self = this;
      axios.get(`http://localhost:3000/one/${id}`)
      .then(response=>{
        let like = response.data.upvote
        let i = response.data.downvote.indexOf(user_id)
        let dislike = response.data.downvote
        like.push(user_id)
        if(i !== -1){
          dislike.splice(i,1)
          axios.put(`http://localhost:3000/edit/${id}`,{
            downvote: dislike
          })
          .then(response=>{
            self.stories[index].downvote = dislike
          })
          .catch(err=>{
            console.log(err);
          })
        }
        else{
          axios.put(`http://localhost:3000/edit/${id}`,{
            upvote: like
          })
          .then(response=>{
            self.stories[index].upvote = like
          })
          .catch(err=>{
            console.log(err);
          })
        }
      })
    },
    dislike(id,index,user_id){
      let self = this;
      axios.get(`http://localhost:3000/one/${id}`)
      .then(response=>{
        let dislike = response.data.downvote
        let i = response.data.upvote.indexOf(user_id)
        let like = response.data.upvote
        dislike.push(user_id)
        if(i !== -1){
          like.splice(i,1)
          axios.put(`http://localhost:3000/edit/${id}`,{
            upvote: like
          })
          .then(response=>{
            self.stories[index].upvote = like
          })
          .catch(err=>{
            console.log(err);
          })
        }
        else{
          axios.put(`http://localhost:3000/edit/${id}`,{
            downvote: dislike
          })
          .then(response=>{
            self.stories[index].downvote = dislike
          })
          .catch(err=>{
            console.log(err);
          })
        }
      })
    },
    listComment(id){
      let self = this;
      axios.get(`http://localhost:3000/ideas/${id}`)
      .then(response=>{
        self.ideas = response.data
        self.isComment = true
        self.currentComment = id
      })
      .catch(err=>{
        console.log(err);
      })
    },
    createComment(story_id){
      let self = this;
      let user = JSON.parse(localStorage.getItem('token'))
      axios.post(`http://localhost:3000/ideas`,{
        idea: self.idea,
        user_id: user._id,
        story_id: story_id,
        creator: user.name,
        createdAt: new Date().toUTCString()
      })
      .then(response=>{
        self.ideas.push(response.data)
        self.idea = ""
      })
      .catch(err=>{
        console.log(err);
      })
    },
    deleteComment(id,index){
      let self = this;
      axios.delete(`http://localhost:3000/ideas/${id}`)
      .then(response=>{
        self.ideas.splice(index,1)
      })
      .catch(err=>{
        console.log(err);
      })
    },
    confirmDelCom(id,index){
      if(confirm(`Are You Sure You Want to Delete This Comment?`)){
        this.deleteComment(id,index)
      }
      else{
        return false
      }
    },
    closeComment(){
      this.isComment = false
      this.idea = ""
    },
    editComment(id,index){
      let self = this;
      axios.put(`http://localhost:3000/ideas/${id}`,{
        idea: self.editIdea,
        createdAt: new Date().toUTCString()
      })
      .then(response=>{
        self.ideas[index].idea = self.editIdea
        self.ideas[index].createdAt = new Date().toUTCString()
        self.currentCommentIndex = ""
      })
      .catch(err=>{
        console.log(err);
      })
    },
    onEditComment(id,index){
      this.editIdea = this.ideas[index].idea
      this.currentCommentIndex = id
    },
    closeEditComment(){
      this.currentCommentIndex = ""
    },
    likeIdea(id,index,user_id){
      let self = this;
      axios.get(`http://localhost:3000/ideas/one/${id}`)
      .then(response=>{
        let like = response.data.upvote || []
        let i = response.data.downvote.indexOf(user_id)
        let dislike = response.data.downvote || []
        like.push(user_id)
        if(i !== -1){
          dislike.splice(i,1)
          axios.put(`http://localhost:3000/ideas/${id}`,{
            downvote: dislike
          })
          .then(response=>{
            self.ideas[index].downvote = dislike
          })
          .catch(err=>{
            console.log(err);
          })
        }
        else{
          axios.put(`http://localhost:3000/ideas/${id}`,{
            upvote: like
          })
          .then(response=>{
            console.log(like);
            self.ideas[index].upvote = like
          })
          .catch(err=>{
            console.log(err);
          })
        }
      })
    },
    dislikeIdea(id,index,user_id){
      let self = this;
      axios.get(`http://localhost:3000/ideas/one/${id}`)
      .then(response=>{
        let dislike = response.data.downvote || []
        let i = response.data.upvote.indexOf(user_id)
        let like = response.data.upvote || []
        dislike.push(user_id) 
        if(i !== -1){
          like.splice(i,1)
          axios.put(`http://localhost:3000/ideas/${id}`,{
            upvote: like
          })
          .then(response=>{
            console.log(like);
            self.ideas[index].upvote = like
          })
          .catch(err=>{
            console.log(err);
          })
        }
        else{
          axios.put(`http://localhost:3000/ideas/${id}`,{
            downvote: dislike
          })
          .then(response=>{
            self.ideas[index].downvote = dislike
            console.log(like);
            console.log(self.ideas[index].upvote);
          })
          .catch(err=>{
            console.log(err);
          })
        }
      })
    }
  },
  created: function() {
    this.listStories()
  },
  computed:{
    user(){
      let user = JSON.parse(localStorage.getItem('token'))
      if(user){
          return user
      }
      else{
        alert(`You Must login first!`)
        window.location('/')
      }
    }
  }
}
</script>

<style lang="css" scoped>
h3 {
  color: black;
  font-size: 24px;
  text-align: center;
  margin-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
  font-weight: 300;
}
        
.container {
    max-width: 970px;
}

body {
background-color: #C0E5D9;
}

.addComment{
  margin-bottom:20px;
}
.creator{
  color:gray;
}

.editcomment{
  color:black;
  margin-top:10px;
}
.cla{
margin: auto;
margin-bottom: 20px;
}
.line{
  margin-top:30px
}
.vote{
  margin-bottom: 30px;
}
.cancel{
  position: fixed;
  margin-top: -100px;
}
.container {
padding: 20px;
}

.note{
color:red;
}

.profile-card {
background-color: #222222;
margin-bottom: 20px;

}

.profile-pic {
border-radius: 50%;
position: absolute;
top: -65px;
left: 0;
right: 0;
margin: auto;
z-index: 1;
max-width: 100px;
-webkit-transition: all 0.4s;
transition: all 0.4s;
	}

	
.profile-info {
color: #BDBDBD;
padding: 25px;
position: relative;
margin-top: 15px;
	}

.profile-info h2 {
color: #E8E8E8;
letter-spacing: 4px;
padding-bottom: 12px;
	}
	
.profile-info span {
display: block;
font-size: 12px;
color: #4CB493;
letter-spacing: 2px;
}

.profile-info a {
color: #4CB493;
}
.profile-info i {
padding: 15px 35px 0px 35px;
}


.profile-card:hover .profile-pic {

transform: scale(1.1);
}

.profile-card:hover .profile-info hr  {
opacity: 1;
}




/* Underline From Center */
.hvr-underline-from-center {
display: inline-block;
vertical-align: middle;
-webkit-transform: translateZ(0);
transform: translateZ(0);
box-shadow: 0 0 1px rgba(0, 0, 0, 0);
-webkit-backface-visibility: hidden;
backface-visibility: hidden;
-moz-osx-font-smoothing: grayscale;
position: relative;
overflow: hidden;
}
.hvr-underline-from-center:before {
content: "";
position: absolute;
z-index: -1;
left: 52%;
right: 52%;
bottom: 0;
background: #FFFFFF;
border-radius: 50%;
height: 3px;
-webkit-transition-property: all;
transition-property: all;
-webkit-transition-duration: 0.2s;
transition-duration: 0.2s;
-webkit-transition-timing-function: ease-out;
transition-timing-function: ease-out;
}
.profile-card:hover .hvr-underline-from-center:before, .profile-card:focus .hvr-underline-from-center:before, .profile-card:active .hvr-underline-from-center:before {
left: 0;
right: 0;
height: 1px;
background: #CECECE;
}

.comments-list{
  color:white;
}

</style>
