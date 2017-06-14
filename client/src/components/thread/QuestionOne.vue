<template>
  <div class="question">
    <md-card v-if="thread">
      <md-card-header>
        <div class="md-title"> {{thread.title}}</div>
        <div class="md-subhead">
          <small>Created {{thread.createdAt}} by  <strong> {{(typeof thread._user !== 'undefined'?  thread._user.username: '')}}</strong></small><br/>
          <small> Last updated at : {{thread.updatedAt || thread.createdAt}}</small>
        </div>
      </md-card-header>
      <md-card-content>
        {{thread.descr}}
      </md-card-content>
      <md-card-actions>

        <md-button v-if="user._id === thread._user._id" @click.native.prevent="onEdit(thread)"> Edit </md-button>
        <md-button v-if="user._id === thread._user._id" @click.native.prevent="onDelete(thread._id)"> Delete </md-button>
        <md-button @click.native.prevent="onReply(thread._id)">Reply</md-button>
        <md-button @click.native.prevent="onVote({_qid:thread._id,vote:1})"
          class="md-fab"
          v-if="typeof thread.upVote !='undefined'"
          :class="thread.upVote.indexOf(`${user._id}`) != -1 ? 'green': 'gray'"
        >
          ^ {{thread.upVote.length}}
        </md-button>
        <md-button class="md-fab"
          @click.native.prevent="onVote({_qid:thread._id,vote:-1})"
          v-if="typeof thread.downVote !='undefined'"
          :class="thread.upVote.indexOf(`${user._id}`) != -1 ? 'green': 'gray'"
        >
          v {{thread.downVote.length}}
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>

export default {
  props: ['id','thread','user'],
  data () {
    return {}
  },
  methods: {
    onReply(_qid) {
      this.$emit('reply',_qid)
    },
    onDelete(_qid) {
      this.$emit('remove',_qid)
    },
    onEdit(thread) {
      this.$emit('edit',thread)
    },
    onVote(vote) {
      console.log(vote)
      this.$emit('vote',vote)
    }

  }
}
</script>