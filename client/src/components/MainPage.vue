<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <ThreadList :user="user"></ThreadList>
      </div>
      <div class="col-md-3" v-if="token">
        <NewThread :creator="token"></NewThread>
      </div>
    </div>
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList'
import NewThread from '@/components/NewThread'
export default {
  components: {
    ThreadList,
    NewThread
  },
  data () {
    return {
      token: null,
      user: {
        id: null,
        name: null
      }
    }
  },
  methods: {
    getToken () {
      this.token = localStorage.getItem('token')
    },
    getUserData () {
      var self = this
      this.axios.post('http://localhost:3000/getdata', {
        token: self.token
      })
      .then(function (response) {
        self.user = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
      })
    }
  },
  created () {
    this.getToken()
    this.getUserData()
  }
}
</script>

<style lang="css">
</style>
