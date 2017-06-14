<template>
  <div class="index">
    <div class="container">
      <h2>Questions</h2>
      <hr>
      <div v-for="thread in threads">
        <div class="columns">
          <div class="column is-1">
            <p>{{thread.vote}}</p>
            <p>votes</p>
          </div>
          <div class="column is-1">
            <p>{{thread.answer_id.length}}</p>
            <p>answers</p>
          </div>
          <div class="column is-10">
            <a class="thread_title"><router-link :to="{ name: 'Thread', params: {id: thread._id} }">{{thread.title}}</router-link></a>
            <p class="posted"><small><span class="tag is-info is-small">Asked by: {{thread.user_name}}</span></small></p>
          </div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'index',
  data () {
    return {
      threads: [],
      token: localStorage.getItem('token'),
      user_id: localStorage.getItem('user_id'),
      user_name: localStorage.getItem('user_name')
    }
  },
  mounted () {
    axios.get('http://localhost:3000/threads')
    .then(response => {
      this.threads = response.data
      console.log(JSON.stringify(response.data))
    })
    .catch(err => console.log(err.message))
  }
}
</script>

<style scoped>
  .index {
    margin-top: 8em;
    height: 30em;
    flex: 1;
  }

  h2 {
    font-size: 1.5em;
  }

  p {
    text-align: center;
  }

  .thread_title {
    text-align: left;
    display: inline-flex;
    padding-left: 1em;
    vertical-align: middle;
  }

  .container {
    width: 70%;
  }

  hr {
    background-color: #F48024;
  }

  .posted {
    text-align: right;
  }
</style>
