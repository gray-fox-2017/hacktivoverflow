<template lang="html">
  <div>
    <h3>Thread List</h3>
    <div>
      <Thread v-for="thread in threadList" :article="thread" :user="user" :vote="thread.vote" :key="thread.id"></Thread>
    </div>
  </div>
</template>

<script>
import Thread from '@/components/Thread'
export default {
  components: {
    Thread
  },
  props: ['user'],
  data () {
    return {
      threadList: []
    }
  },
  methods: {
    getThreads (callback) {
      var self = this
      this.axios.get('http://localhost:3000/api/threads')
      .then(response => {
        self.threadList = response.data
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getThreads()
  }
}
</script>

<style lang="css">
</style>
