<template lang="html">
  <div>
    <div class = 'head container'>
      <div class="row">
      <h1>{{getuser.name}}'s Stories</h1>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#story-modal">CREATE STORY</button>
      <br>
      <div class="read" v-if="isRead === true">
        <button type="button" class="cancel btn btn-danger" v-on:click="cancelRead()">Cancel</button>
        <h1>{{title}}</h1>
        <h4>{{story}}</h4>
      </div>      
    <div class="modal fade container" id="story-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="margin-top:50px">
      <div class="col-md-offset-2 col-md-8 jumbotron">
        <form>
          <h1>Create Story</h1>
          <div class="form-group col-12">
            <label>Title</label>
            <input type="text" class="form-control" v-model="title">
          </div>
          <div class="form-group col-12">
            <label>Premise</label>
            <input type="text" class="form-control" v-model="premise">
          </div>
          <div class="form-group col-12">
            <label>Story</label>
            <textarea class="form-control" rows="10" v-model="story"></textarea>
          </div>
          <div class="form-group col-12">
            <label>Note</label>
            <input type="text" class="form-control" v-model="note">
          </div>
          <div class="col-12">
              <button type="submit" v-on:click="createStory()" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
      </div>
    </div>
    <div class="stories col-md-4" v-for="(story,index) in mystories">
        <figure class="snip1174 navy col-md-4">
          <img class ="back" src="https://thumbs.dreamstime.com/t/pen-notepad-dark-background-d-render-mockup-identity-element-set-black-elements-black-backgnound-79699680.jpg" alt="planet" />
          <figcaption class ="content">
            <h1>{{story.title}}</h1>
            <p class="premise">{{story.premise}}</p>
            <p class="note">{{story.note}}</p>
            <a class="btn btn-danger" v-on:click="confirmDel(story._id,index)"><span class="glyphicon glyphicon-trash"></span>Delete</a>
            <a class="btn btn-primary"><span class="glyphicon glyphicon-share"></span>Edit</a>
            <a class="btn btn-success" v-on:click="readStory(story._id)"><span class="glyphicon glyphicon-book"></span>Read Story</a>
          </figcaption>
        </figure>
        </div>    
  </div>  
</template>

<script>
export default {
  data(){
    return{
      mystories:[],
      title:"",
      story:"",
      premise:"",
      note:"",
      isRead: false
    }
  },
  methods:{
    userStories(){
      let self = this;
      let user = JSON.parse(localStorage.getItem('token'))
      axios.get(`http://localhost:3000/${user._id}`)
      .then(response=>{
        self.mystories = response.data
      })
      .catch(err=>{
        console.log(err);
      })
    },
    createStory(){
      let self = this
      let user = JSON.parse(localStorage.getItem('token'))
      axios.post(`http://localhost:3000/create`,{
        title: self.title,
        premise: self.premise,
        story: self.story,
        note: self.note,
        createdAt: new Date().toUTCString(),
        creator: user.name,
        user_id: user._id
      })
      .then(response=>{
        self.mystories.push(response.data)
      })
      .catch(err=>{
        console.log(err);
      })
    },
    deleteStory(id,index){
      let self = this
      axios.delete(`http://localhost:3000/${id}`)
      .then(response=>{
        self.mystories.splice(index,1)
      })
      .catch(err=>{
        console.log(err);
      })
    },
    confirmDel(id,index){
      if(confirm(`Are You Sure You Want To Delete This Story?`)){
        this.deleteStory(id,index)
      }
      else{
        return false
      }
    },
    editStory(id,index){
      let self = this;
      axios.put(`http://localhost:3000/${id}`,{
        title: self.title,
        premise: self.premise,
        story: self.story,
        note: self.note,
        createdAt: new Date().toUTCString()
      })
      .then(response=>{
        axios.get(`http://localhost:3000/one/${id}`)
        .then(res=>{
          self.mystories[index] = res.data
        })
        .catch(err=>{
          console.log(err);
        })
      })
    },
    readStory(id){
      console.log(`masuk read`);
      let self = this;
      axios.get(`http://localhost:3000/one/${id}`)
      .then(response=>{
        self.isRead = true
        self.title = response.data.title
        self.story = response.data.story
        console.log(self.story);
        console.log(response.data.story);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    cancelRead(){
      this.isRead = false
      this.title = ""
      this.story = ""
    }
  },
  created:function(){
    this.userStories()
  },
  computed:{
    getuser(){
      return JSON.parse(localStorage.getItem('token'))
    }
  }
}
</script>

<style lang="css" scoped>
.head{
  text-align: center;
  margin-bottom: 50px;
}

.cancel{
  position: fixed;
  margin-top: -200px;
  margin-left: 400px;
}

.stories{
  margin-bottom: 40px;
}

.read{
  margin:auto;
}

.back {
  width: 372px;
  height: 234px;
}

.premise{
  color: green;
}
.note{
  color:red;
}
.services{
    margin: 20px auto;    
  }
figure.snip1174 {
  color: #fff;
  position: relative;
  /*float: left;*/
  overflow: hidden;
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: center;
  margin: 10px;
  width: 100%;
  border-radius: 0px;
}
figure.snip1174 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
figure.snip1174 img {
  max-width: 100%;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  vertical-align: top;
  opacity: 0.7;
}
figure.snip1174 figcaption {
  position: absolute;
  text-align: center;
  /*padding: 40px 25px;*/
  top: 0;
  left: 0;
}
figure.snip1174 h2,
figure.snip1174 p {
  margin: 0;
  padding: 0;
}
figure.snip1174 h2 {
  margin-bottom: 10px;
  display: inline-block;
  font-weight: 100;
  font-size: 1.8em;
}
figure.snip1174 p {
  margin-bottom: 20px;
  line-height: 1.4em;
}
figure.snip1174 a {
  text-align: center;
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #ffffff;
  text-decoration: none;
  color: #ffffff;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.8em;
  -webkit-transform: translateY(50%);
  transform: translateY(50%);
  opacity: 0;
  margin-left:12px;
}
figure.snip1174 a:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
figure.snip1174.blue {
  background-color: #20638f;
}
figure.snip1174.yellow {
  background-color: #c87f0a;
}
figure.snip1174.green {
  background-color: #1e8449;
}
figure.snip1174.navy {
  background-color: #222f3d;
}
figure.snip1174.red {
  background-color: #962d22;
}
figure.snip1174:hover img,
figure.snip1174.hover img {
  opacity: 0;
  -webkit-transform: scale(1);
  transform: scale(1);
}
figure.snip1174:hover a,
figure.snip1174.hover a {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}
</style>
