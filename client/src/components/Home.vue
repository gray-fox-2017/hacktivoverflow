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
                  <a class="header" style="font-size:30px">{{totalQuestions(listQuestion)}}</a>
                  <div class="meta">
                    <span>PERTANYAAN</span>
                  </div>
                </div>
              </div>
          </div>
        </div>

      </div>
      </div>

      <div  class="flex-item ui segment" style="width:65%; background-color:white; border-radius:5px; margin-right:5%">

        <div class="ui tabular menu">
          <a class="active item">
            Terpopuler
          </a>
          <a class="item">
            Terbaru
          </a>
        </div>

        <div class="ui celled list" style="margin-top:5%;">
          <div class="item" v-for="(question,index) in listQuestion">
            <div class="content" style="margin-top:1%;margin-bottom:1%;">
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
                  <div class="column" style="width:70%; margin-top:2.5%">
                    <a @click="getDetilQuestion(question._id)">{{question.title}}</a>
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

import {mapGetters} from 'vuex'

export default {
  computed:{
      ...mapGetters([
        'listQuestion'
      ])
  },
  methods:{
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
    }
  },
  created(){
    return this.$store.dispatch('getListQuestion')
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
