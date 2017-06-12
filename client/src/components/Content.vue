<template lang="html">
    <div class="container" v-if="nilailogin == true">
      <div class="row">
        <h3>Top article</h3>
        <div class="row">
          <Home v-bind:questions="questions"></Home> <!-- home adalah child dari components content-->
          <!-- {{}} -->
          <!-- <h1 v-for="question in questions">{{question.title}}</h1> -->
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <h1>test</h1>
    </div>

</template>

<script>
import Home from './Home'
export default {
  props: ['nilailogin'],
  components: {
    Home
    // Welcome
  },
  data () {
    return {
      questions: [],
      islogin: false
    }
  },
  created () {
    this.getQuestion()
    this.questions = this.getQuestion()
    console.log('Hi Token !',localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.islogin == true
    }
    // else {
    //   // window.alert('login please')
    //   window.location = "/login"
    // }

  },
  computed: {
    cekLogin: function() {
      if (localStorage.getItem('token')) {
        this.islogin == true
        return this.islogin
      }

    }
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
