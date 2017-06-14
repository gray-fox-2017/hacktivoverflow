<template lang="html">
  <div class="thread">
    <div class="container">
      <h2>{{thread.title}}</h2>
      <hr>
      <div class="columns">
        <div class="column is-1 vote">
          <p>{{thread.vote}}</p>
          <p>votes</p>
        </div>
        <div class="column is-11 que">
          <p>{{thread.question}}</p>
        </div>
      </div>
      <br>
      <p class="posted"><small><span class="tag is-info is-small">Asked by: {{thread.user_name}}</span></small></p>
    </div>
    <div class="container">
      <div v-if="thread.answer_id.length > 1">
        <h2>{{thread.answer_id.length}} Answers</h2>
        <hr>
      </div>
      <div v-else>
        <h2>{{thread.answer_id.length}} Answer</h2>
        <hr>
      </div>
      <div v-if="thread.answer_id.length > 0">
        <div v-for="answer in thread.answer_id">
          <div class="columns answer_column">
            <div class="column is-1 vote">
              <p>{{answer.vote}}</p>
              <p>votes</p>
            </div>
            <div class="column is-11">
              <p>{{answer.answer}}</p><br>
              <p class="posted"><small><span class="tag is-success is-small">Answered by: {{answer.user_name}}</span></small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'thread',
  data () {
    return {
      thread: {}
    }
  },
  mounted () {
    let id = this.$route.params.id
    axios.get('http://localhost:3000/threads/' + id)
    .then(response => {
      this.thread = response.data
      console.log(JSON.stringify(response.data))
    })
    .catch(err => console.log(err.message))
  }
}
</script>

<style scoped>
  .thread {
    margin-top: 8em;
    height: 30em;
    flex: 1;
  }

  h2 {
    font-size: 1.5em;
  }

  .container {
    width: 70%;
    margin-bottom: 5em;
  }

  hr {
    background-color: #F48024;
  }

  .que {
    text-align: left;
    display: inline-flex;
    padding: auto;
    vertical-align: middle;
    border: solid 0.15em #F48024;
    line-height: 2em;
    letter-spacing: 0.1em;
    min-height: 15em;
  }

  .answer_column {
    border-bottom: solid 0.1em #F48024;
    margin-bottom: 2em;
  }

  .vote {
    text-align: center;
  }

  .posted {
    text-align: right;
  }
</style>
