<template>
  <div class="flex-container" style="margin-left:5%;">

      <div class="flex-item" style="width:15%;">
        <div class="ui item" style="margin-top:5%">
            <div class="flex-item" style="width:100%">
              <div class="flex-item" style="width:100%">
                  <a @click="upVoteQuestion(detil_question._id)"><i class="angle up huge icon"></i></a>
              </div>
              <div class="flex-item mid" style="width:100%">
                  <span>{{totalVotes(detil_question.votes)}}</span>
              </div>
              <div class="flex-item" style="width:100%">
                  <a @click="downVoteQuestion(detil_question._id)"><i class="angle down huge icon"></i></a>
              </div>
            </div>
        </div>
      </div>

      <div  class="flex-item" style="width:80%; background-color:white; border-radius:5px; margin-right:1%">
        <div id="content" class="ui card">
          <div class="content">
            <div class="header">{{detil_question.title}}</div>
            <div class="meta">
              <span>{{detil_question.created}}</span>
              <a>by {{detil_question.asked_by.username}}</a>
            </div>
            <p>{{detil_question.description}}</p>
            <br>
            <button class="ui green button" type="button" style="float:left" @click="showModal">Answer</button>
          </div>
          <div class="ui divider"></div>
            <div v-for="(answer,index) in answersByQuestion " class="ui comments" style="margin-left:3%;margin-right:3%">
              <div class="comment" >
                <a class="avatar">
                  <img src="https://semantic-ui.com/images/avatar2/large/matthew.png">
                </a>
                <div class="content">
                  <a class="author">{{answer.answered_by.username}}</a>
                  <div class="metadata">
                    <div class="date">{{answer.created}}</div>
                  </div>
                  <div class="text">
                    <p>{{answer.description}}</p>
                  </div>
                  <div class="actions">
                    <a v-if="user==answer.answered_by.username || user===detil_question.asked_by.username" class="reply" @click="showModalDelete">delete</a>
                  </div>
                </div>
              </div>
              <!--Modal Delete-->
              <div class="ui small modal">
                <div class="header">
                  Delete Answer
                </div>
                <div class="content">
                  <p>Are you sure you want to delete this answer?</p>
                </div>
                <div class="actions">
                  <div class="ui negative button">
                    No
                  </div>
                  <div class="ui positive right labeled icon button" @click="deleteAnswer(answer._id,index)">
                    Yes
                    <i class="checkmark icon"></i>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div id="test" class="ui modal modalShowComment " >
          <i class="close icon"></i>
          <div class="header">
            <h4 class="ui header">Answer</h4>
          </div>
          <div class="content">
            <div class="ui form">
              <div class="field">
                <textarea row="2" v-model="new_description"></textarea>
              </div>
            </div>
          </div>
          <div class="actions">
            <div class="ui button" @click="closeModal">Cancel</div>
            <div class="ui blue button" @click="addAnswer">Submit</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  props:['id'],
  data(){
    return{
      new_description:'',
      user:window.localStorage.getItem('user')
    }
  },
  computed:{
    ...mapGetters([
      'detil_question',
      'questioner',
      'answersByQuestion'
    ])
  },
  methods:{
    totalVotes(arr){
      return arr.reduce((total,value)=>{
        return total + value.vote
      },0)
    },
    showModal(){
      $('.modalShowComment').modal('show');
    },

    closeModal(){
      $('.modalShowComment').modal('hide');
    },

    addAnswer(){
      let self = this
      let token = window.localStorage.getItem('token')
      axios.post(`http://localhost:3000/answers/${this.id}`,{
        description: self.new_description
      },{
        headers:{
          token:token
        }
      })
      .then(response =>{

        this.$store.commit('addAnswer',response.data.answers)
        $('.modalShowComment').modal('hide');
      })
    },

    showModalDelete(){
      $('.small.modal').modal('show');
    },

    closeModalDelete(){
      $('.small.modal').modal('hide');
    },

    deleteAnswer(id,index){
      let self = this
      let token = window.localStorage.getItem('token')
      axios.delete(`http://localhost:3000/answers/${id}`,{
        headers:{
          token:token
        }
      })
      .then(response =>{
        // console.log(response.data);
        this.$store.commit('deleteAnswer',id,index)
        $('.small.modal').modal('hide');
      })
    },
    upVoteQuestion(id){
      console.log('id---------',id);
      let self = this
      let token = window.localStorage.getItem('token')
        axios.post(`http://localhost:3000/votes/question/${id}`, {
            vote: 1
          }, {
            headers: {
              token: token
            }
          })
          .then(response => {
              if (response.data.validated) {
                this.$store.dispatch('getDetilQuestion',this.id)
              } else {
                alert('this question has been voted by you dude!')
              }
              console.log('vote-------', response.data)
          })
    },

    downVoteQuestion(id){
      let self = this
      let token = window.localStorage.getItem('token')

        axios.post(`http://localhost:3000/votes/question/${id}`, {
            vote: -1
          }, {
            headers: {
              token: token
            }
          })
          .then(response => {
              if (response.data.validated) {
                this.$store.dispatch('getDetilQuestion',this.id)
              } else {
                alert('this question has been voted by you dude!')
              }
              console.log('vote-------', response.data)
          })
    }
  },

  created(){
    this.$store.dispatch('getDetilQuestion',this.id)
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

#content{
  width:100%;
}

.mid{
  margin-left: 23px;
  font-size: 40px;
}

.flex-container{
   display: flex;
   flex-wrap: wrap;
}

.flex-item {
  flex-direction: row;
  float: left;
  border-radius: 5px;
}



</style>
