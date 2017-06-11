<template lang="html">
  <div id="app">
    <div class="container">
      <div class="row">
        <h3>Top article</h3>
        <div class="row">
          <home v-bind:questions="questions"></home>
          <!-- <h1 v-for="question in questions">{{question.title}}</h1> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Home from './Home'
export default {
  components: {
    Home
  },
  data () {
    return {
      questions: []
    }
  },
  created () {
    this.getQuestion()
    this.questions = this.getQuestion()
    console.log('hi', this.questions);
  },
  methods: {

    getQuestion: function() {
      var self = this
      self.home = true
      axios.get('http://localhost:3000/api/questions', {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
      .then(function(response) {
        self.questions = response.data
        console.log(JSON.stringify(response.data));

      })
      .catch(function(err) {
        console.log(err);
      })
    }
  }

}
</script>

<style lang="css">
</style>
