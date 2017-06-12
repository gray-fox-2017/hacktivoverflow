<template lang="html">
  <div class="container">
    <div class="row prime">
      <div class="col-md-9">
        <h2>Edit Thread</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 needpad">
        <form class="form-horizontal col-md-10">
          <div class="form-group">
            <label class="col-sm-2 control-label">Title</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="thread.title">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Content</label>
            <div class="col-sm-10">
              <textarea class="form-control" v-model="thread.threadContent" rows="15"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-success btn-circle text-uppercase" type="button" @click="doEdit"><span class="glyphicon glyphicon-send"></span> Edit Thread</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      }
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
    doEdit () {
      var self = this
      this.axios.put(`http://localhost:3000/api/threads/${self.thread._id}`, {
        token: localStorage.getItem('token'),
        title: self.thread.title,
        threadContent: self.thread.threadContent
      })
      .then(response => {
        this.$router.push({path: 'thread', query: { id: self.thread._id }})
      })
    }
  },
  created () {
    this.getThread()
  }
}
</script>

<style lang="css">
</style>
