<template>

  <div class="flex-container" style="margin-left:5%;">

      <div class="flex-item" style="width:30%; margin-top:15px;">
        <div class="ui items">
          <div class="item floating">

            <div class="ui special cards">
              <div class="card">
                <div class="blurring dimmable image">
                  <div class="ui dimmer">
                    <div class="content">

                    </div>
                  </div>

                </div>
                <div class="content center aligned ">
                  <a class="header" style="font-size:30px">{{totalQuestions(listQuestionByUser)}}</a>
                  <div class="meta">
                    <span>QUESTIONS</span>

                  </div>
                </div>
              </div>
          </div>
        </div>

      </div>
      </div>

      <div  class="flex-item ui segment" style="width:65%; background-color:white; border-radius:5px; margin-right:5%">

        <div class="ui form success">
          <div class="field" style="width:100%">
            <label>Title</label>
                <input type="text" v-model="new_question.title">
          </div>
         <div class="field">
           <label>Description</label>
          <textarea v-model="new_question.description"></textarea>
        </div>
          <div class="ui success message hidden">
            <div class="header">Success</div>
            <p>You posted a new question</p>
          </div>
          <div class="ui submit button" @click="addQuestion">Post</div>
        </div>

        <div class="ui celled list" style="margin-top:5%;">
          <div class="item flex-item" v-for="(question,index) in listQuestionByUser" style="width:100%">
            <div class="content flex-item" style="margin-top:1%;margin-bottom:1%; width:100%">
              <div class="ui grid">
                <div class="row">
                  <div class="column" style="width:10%">
                    <div class="ui small compact message flex-item">
                      <div class="header">
                        {{totalVotes(question.votes)}}
                      </div>
                      <p style="font-size:10px">Votes</p>
                    </div>
                  </div>
                  <div class="column" style="width:10%">
                    <div class="ui small compact positive message flex-item" >
                      <div class="header">
                        {{totalAnswers(question.answers)}}
                      </div>
                      <p style="font-size:10px">Answers</p>
                    </div>
                  </div>
                  <div class="column" style="width:56%; margin-top:2.5%">
                    <a @click="getDetilQuestion(question._id)">{{question.title}}</a>
                  </div>
                  <div class="column" style="float:right; margin-top:2.5%; width:10%;">
                    <button class="ui yellow button" @click="showModal">Edit</button>
                  </div>
                  <div class="column" style="float:right; margin-top:2.5%; width:10%;">
                    <button class="ui red button" @click="deleteQuestion(question._id)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ui modal modalShowEdit">
            <i class="close icon"></i>
            <div class="header">
              <h4 class="ui header">Edit Question</h4>
            </div>
            <div class="content">
              <div class="ui form">
                <div class="field" style="width:100%">
                  <label>Title</label>
                      <input type="text" v-model="question.title">
                </div>
              </div>
              <div class="ui form">
                <div class="field">
                  <label>Description</label>
                  <textarea row="2" v-model="question.description"></textarea>
                </div>
              </div>
            </div>
            <div class="actions">
              <div class="ui button" @click="closeModal">Cancel</div>
              <div class="ui blue button" @click="editQuestion(index)">Submit</div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  computed:{

      ...mapGetters([
        'listQuestionByUser'
      ])
  },
  data() {
    return {
      new_question:{
        title:'',
        description:''
      }
    }
  },
  methods:{

    showModal(){
      $('.modalShowEdit').modal('show');
    },

    closeModal(){
      $('.modalShowEdit').modal('hide');
    },
    totalQuestions(arr){
      return arr.length
    },
    totalVotes(arr){
      return arr.reduce((total,value)=>{
        return total + value.vote
      },0)
    },
    totalAnswers(arr){
      return arr.length
    },
    getDetilQuestion(id){
      this.$router.push('/detil_question/' + id)
    },
    addQuestion(){
      console.log('masukk add');
      let self = this
      let token = window.localStorage.getItem('token');
      console.log(token);
      axios.post('http://localhost:3000/questions',{
        title:self.new_question.title,
        description:self.new_question.description
      },{
          headers:{
            token:token
          }
        }).then(response =>{
          console.log('self---addd',self.list_question);
          self.$store.dispatch('getListQuestion')
      })
    },
    editQuestion(i){
      console.log('masukk edit');
      let self = this
      let token = window.localStorage.getItem('token');
      console.log(this.listQuestionByUser[i].title);
      axios.put('http://localhost:3000/questions',{
        title:self.listQuestionByUser[i].title,
        description:self.listQuestionByUser[i].description
      },{
          headers:{
            token:token
          }
        }).then(response =>{
          self.$store.dispatch('getListQuestion')
          $('.modalShowEdit').modal('hide');
      })
    },
    deleteQuestion(id){
      console.log('masuk delte');
      let self = this
      let token = window.localStorage.getItem('token');
      axios.delete(`http://localhost:3000/questions/${id}`,{
        headers:{
          token:token
        }
      })
      .then(response =>{
        self.$store.dispatch('getListQuestion')
      })
    }

  },
  created(){
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
