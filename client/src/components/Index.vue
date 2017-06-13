<template>
  <div class="index">
    <ul v-for="thread in threads">
      <li>{{thread.title}}</li>
      <li>{{thread.question}}</li>
      <li>{{thread.vote}}</li>
    </ul>
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
    .then(response => { this.threads = response.data })
    .catch(err => console.log(err.message))
  }
}
</script>
