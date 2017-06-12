<template lang="html">
  <div class="container">
    <div class="row prime">
      <div class="col-md-9">
        <h2>{{ thread.title }}</h2>
      </div>
      <div class="col-md-3" v-if="token">
        <NewThread :creator="token"></NewThread>
      </div>
    </div>
    <div class="row">
      <div class="col-md-1">
        <div class="text-center" title="This thread is useful">
          <i v-if="!token" class="fa fa-caret-up" aria-hidden="true" style="font-size: 3em;"></i>
          <i v-if="!upvoted && token" @click="doUpvote" class="fa fa-caret-up" aria-hidden="true" style="font-size: 3em; cursor: pointer"></i>
          <i v-if="upvoted" class="fa fa-caret-up" aria-hidden="true" style="font-size: 3em; color: green; cursor: pointer"></i>
        </div>
        <div class="text-center" title="This thread is useful">
          <span>{{ thread.upvotes.length - thread.downvotes.length }}</span>
        </div>
        <div class="text-center" title="This thread is unclear or not useful">
          <i v-if="!token" class="fa fa-caret-down" aria-hidden="true" style="font-size: 3em;"></i>
          <i v-if="!downvoted && token" @click="doDownvote" class="fa fa-caret-down" aria-hidden="true" style="font-size: 3em; cursor: pointer"></i>
          <i v-if="downvoted" class="fa fa-caret-down" aria-hidden="true" style="font-size: 3em; color: red; cursor: pointer"></i>
        </div>
      </div>
      <div class="col-md-7 needpad">
        <p v-for="content in thread.threadContent.split('\n')">{{ content }}</p>
        <p>asked by: {{ thread.creator.name }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5"></div>
      <div class="col-md-1">
        <button v-if="user.id === thread.creator._id" type="button" class="btn btn-default"><router-link :to="{ path: 'edit', query: { id: thread._id }}">Edit</router-link></button>
      </div>
      <div class="col-md-2">
        <button v-if="user.id === thread.creator._id" @click="deleteThread" type="button" class="btn btn-danger">Delete Thread</button>
      </div>
    </div>
    <div class="row" style="margin-top: 30px">
      <div class="col-md-5">
        <h5 v-if="thread.replies.length > 1">{{ thread.replies.length }} replies</h5>
        <h5 v-else>{{ thread.replies.length }} reply</h5>
      </div>
    </div>
    <Reply v-for="response in value" @delete="deleteValue" :repid="response._id" :parent="thread._id" :key="response._id"></Reply>
    <NewReply v-model="value" v-on:create="updateValue"></NewReply>
  </div>
</template>

<script>
import NewThread from '@/components/NewThread'
import Reply from '@/components/Reply'
import NewReply from '@/components/NewReply'
export default {
  components: {
    NewThread,
    Reply,
    NewReply
  },
  data () {
    return {
      thread: {
        title: null,
        threadContent: '',
        creator: {
          name: ''
        },
        replies: [],
        upvotes: [],
        downvotes: []
      },
      token: localStorage.getItem('token') || false,
      user: JSON.parse(localStorage.getItem('user')) || {
        id: '',
        name: ''
      },
      downvoted: false,
      upvoted: false,
      value: []
    }
  },
  methods: {
    getThread () {
      var self = this
      let thread = this.$route.query.id
      this.axios.get(`http://localhost:3000/api/threads/${thread}/replies`)
      .then(response => {
        self.thread = response.data
        self.value = response.data.replies
        self.upvoted = response.data.upvotes.includes(self.user.id)
        self.downvoted = response.data.downvotes.includes(self.user.id)
      })
      .catch(err => console.log(err))
    },
    doUpvote () {
      var self = this
      this.axios.put(`http://localhost:3000/api/threads/${self.thread._id}/upvote`, {
        token: localStorage.getItem('token')
      })
      .then(response => {
        if (self.downvoted) {
          self.downvoted = false
          let downvoteFlag = self.thread.downvotes.indexOf(self.user.id)
          self.thread.downvotes.splice(downvoteFlag, 1)
        } else if (!self.upvoted && !self.downvoted) {
          self.upvoted = true
          self.thread.upvotes.push(self.user.id)
        }
      })
    },
    doDownvote () {
      var self = this
      this.axios.put(`http://localhost:3000/api/threads/${self.thread._id}/downvote`, {
        token: localStorage.getItem('token')
      })
      .then(response => {
        if (self.upvoted) {
          self.upvoted = false
          let upvoteFlag = self.thread.upvotes.indexOf(self.user.id)
          self.thread.upvotes.splice(upvoteFlag, 1)
        } else if (!self.upvoted && !self.downvoted) {
          self.downvoted = true
          self.thread.downvotes.push(self.user.id)
        }
      })
    },
    deleteThread () {
      let self = this
      if (window.confirm('Are you sure you want to delete this thread? (cannot be undone)')) {
        this.axios.delete(`http://localhost:3000/api/threads/${self.thread._id}`, {
          token: localStorage.getItem('token')
        })
        .then(response => {
          this.$router.push(`/`)
        })
      }
    },
    updateValue (tes) {
      this.value.push(tes)
    },
    deleteValue (tes) {
      this.value = this.value.filter(function (el) {
        return el._id !== tes._id
      })
    }
  },
  created () {
    this.getThread()
  }
}
</script>

<style lang="css">
.prime {
  padding: 10px 0;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 20px;
}
.needpad {
  padding-top: 20px;
}
</style>
