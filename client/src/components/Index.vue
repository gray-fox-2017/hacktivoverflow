<template>
  <div class="index">
    <div class="container">
      <h2>Questions</h2>
      <div v-for="thread in threads">
      <hr>
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
            <p class="thread_title">{{thread.title}}</p>
          </div>
        </div>
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
      token: localStorage.getItem('token')
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
    vertical-align: middle;
    padding-left: 1em;
  }

  .container {
    width: 70%;
  }

  hr {
    background-color: #F48024;
  }
</style>
