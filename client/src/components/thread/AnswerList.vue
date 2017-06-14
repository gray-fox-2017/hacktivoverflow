<template>
  <div class="answer">
    <md-card md-with-hover v-for="ans in answers" :key="ans._id"  style="background-color:white">
      <md-card-header>
        <div class="md-title">{{ans._user.username}} {{ ans.upVote.length > 0 ? `^${ans.upVote.length}`: ''}} {{ ans.downVote.length > 0 ? `v${ans.downVote.length}`: ''}} </div>
        <div class="md-subhead"><small>{{ans.createdAt}}</small></div>
      </md-card-header>
      <md-card-content>
        <label>{{ans.descr}}</label> <br/>
          </md-input-container>
        </form>
      </md-card-content>
      <md-card-actions>

        <md-button v-if="user._id === ans._user._id" @click.native.prevent="onEdit(ans)">Update</md-button>
        <md-button @click.native.prevent="onRemove(ans._id)" v-if="user._id === ans._user._id">Delete</md-button>

        <md-button
          class="md-fab"
          @click.native.prevent="onVote({_aid:ans._id,vote:1})"
          :class="ans.upVote.indexOf(user) != -1 ? 'green': 'gray'"
          :disabled="ans.upVote.indexOf(user) != -1 || ans.downVote.indexOf(user) != -1"
        >
          <div class="icon-caption">^ {{ans.upVote.length}}</div>
        </md-button>
        <md-button class="md-fab"
          @click.native.prevent="onVote({_aid:ans._id,vote:-1})"
          :class="ans.upVote.indexOf(user)!= -1 ? 'md-fab md-primary': 'md-fab'"
          :disabled="ans.upVote.indexOf(user) != -1 || ans.downVote.indexOf(user) != -1"
        >
          <div class="icon-caption">v {{ans.downVote.length}}</div>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  props: ['id','answers','user'],
  data () {
    return {
      answerList : [],
    }
  },
  methods: {
    onEdit(ans) {
      console.log(ans)
      this.$emit('edit', ans)
    },
    onRemove(_aid) {
      this.$emit('remove',_aid);
    },
    onVote(vote) {
      console.log(vote)
      this.$emit('vote',vote)
    }
  }
}

</script>