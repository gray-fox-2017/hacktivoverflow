<template lang="html">
  <div class="row" style="margin-top: 30px">
    <form class="form-horizontal col-md-10">
      <div class="form-group">
        <label for="email" class="col-sm-2 control-label">Comment</label>
        <div class="col-sm-10">
          <textarea class="form-control" v-model="comment" rows="5"></textarea>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button class="btn btn-success btn-circle text-uppercase" type="button" @click="createReply"><span class="glyphicon glyphicon-send"></span> Submit comment</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: localStorage.getItem('token') || false,
      user: JSON.parse(localStorage.getItem('user')) || false,
      comment: ''
    }
  },
  props: ['value'],
  methods: {
    createReply () {
      var self = this
      let thread = this.$route.query.id
      this.axios.post(`http://localhost:3000/api/threads/${thread}/reply`, {
        responseContent: self.comment,
        token: self.token
      })
      .then(response => {
        self.$emit('create', response.data)
        self.comment = ''
      })
    }
  }
}
</script>

<style lang="css">
</style>
