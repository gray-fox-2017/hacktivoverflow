<template lang="html">
  <div class="row">
    <div class="col-md-1">
      <div class="text-center" title="This response is useful">
        <i v-if="!token" class="fa fa-caret-up" aria-hidden="true" style="font-size: 3em;"></i>
        <i v-if="!upvoted && token" @click="doUpvote" class="fa fa-caret-up" aria-hidden="true" style="font-size: 3em; cursor: pointer"></i>
        <i v-if="upvoted" class="fa fa-caret-up" aria-hidden="true" style="font-size: 3em; color: green; cursor: pointer"></i>
      </div>
      <div class="text-center" title="This response is useful">
        <span>{{ response.upvotes.length - response.downvotes.length }}</span>
      </div>
      <div class="text-center" title="This thread is unclear or not useful">
        <i v-if="!token" class="fa fa-caret-down" aria-hidden="true" style="font-size: 3em;"></i>
        <i v-if="!downvoted && token" @click="doDownvote" class="fa fa-caret-down" aria-hidden="true" style="font-size: 3em; cursor: pointer"></i>
        <i v-if="downvoted" class="fa fa-caret-down" aria-hidden="true" style="font-size: 3em; color: red; cursor: pointer"></i>
      </div>
    </div>
    <div class="col-md-6 needpad">
      <p v-for="content in response.responseContent.split('\n')">{{ content }}</p>
      <p>replied by: {{ response.creator.name }}</p>
    </div>
    <div class="col-md-1 needpad">
      <i v-if="user.id === response.creator._id" @click="removeItem" class="fa fa-times" aria-hidden="true" style="color: red; cursor: pointer" title="Delete reply"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['repid', 'parent'],
  data () {
    return {
      response: {
        responseContent: '',
        creator: '',
        downvotes: [],
        upvotes: []
      },
      token: localStorage.getItem('token') || false,
      user: JSON.parse(localStorage.getItem('user')) || {
        name: '',
        id: ''
      },
      downvoted: false,
      upvoted: false
    }
  },
  methods: {
    getResponse () {
      var self = this
      this.axios.get(`http://localhost:3000/api/threads/${self.parent}/reply/${self.repid}`)
      .then(response => {
        self.response = response.data
        self.upvoted = response.data.upvotes.includes(self.user.id)
        self.downvoted = response.data.downvotes.includes(self.user.id)
      })
      .catch(err => console.log(err))
    },
    doUpvote () {
      var self = this
      this.axios.put(`http://localhost:3000/api/threads/${self.parent}/reply/${self.response._id}/upvote`, {
        token: self.token
      })
      .then(response => {
        if (self.downvoted) {
          self.downvoted = false
          let downvoteFlag = self.response.downvotes.indexOf(self.user.id)
          self.response.downvotes.splice(downvoteFlag, 1)
        } else if (!self.upvoted && !self.downvoted) {
          self.upvoted = true
          self.response.upvotes.push(self.user.id)
        }
      })
    },
    doDownvote () {
      var self = this
      this.axios.put(`http://localhost:3000/api/threads/${self.parent}/reply/${self.response._id}/downvote`, {
        token: self.token
      })
      .then(response => {
        if (self.upvoted) {
          self.upvoted = false
          let upvoteFlag = self.response.upvotes.indexOf(self.user.id)
          self.response.upvotes.splice(upvoteFlag, 1)
        } else if (!self.upvoted && !self.downvoted) {
          self.downvoted = true
          self.response.downvotes.push(self.user.id)
        }
      })
    },
    removeItem () {
      var self = this
      if (window.confirm('Are you sure you want to delete this thread? (cannot be undone)')) {
        this.axios.delete(`http://localhost:3000/api/threads/${self.parent}/reply/${self.response._id}`)
        .then(response => {
          self.$emit('delete', response.data)
        })
      }
    }
  },
  created () {
    this.getResponse()
  }
}
</script>

<style lang="css" scoped>
.needpad {
  padding-top: 20px;
}
</style>
