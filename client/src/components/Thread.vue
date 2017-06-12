<template lang="html">
  <div class="container outer">
    <div class="row">
      <div class="col-md-3 flex-container">
        <!-- <div class="vote">
          <div>
            <a v-if="upvoted"><i class="fa fa-arrow-up" aria-hidden="true" style="color: green"></i></a>
            <a v-if="!upvoted" @click="doUpvote(article)"><i class="fa fa-arrow-up" aria-hidden="true" style="color: black"></i></a>
          </div>
          <div>
            <a v-if="downvoted"><i class="fa fa-arrow-down" aria-hidden="true" style="color: red"></i></a>
            <a v-if="!downvoted" @click="doDownvote(article)"><i class="fa fa-arrow-down" aria-hidden="true" style="color: black"></i></a>
          </div>

        </div> -->
        <div class="bungkus">
          <div class="votes">
            <p class="dempet">{{ article.upvotes.length - article.downvotes.length }}</p>
            <p>votes</p>
          </div>
        </div>
        <div class="bungkus">
          <div class="replies">
            <p class="dempet">{{ article.replies.length }}</p>
            <p>replies</p>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <h4 @click="threadDetail"><a href>{{ article.title }}</a></h4>
        <h4><small>created by {{ article.creator.name }}</small></h4>
      </div>
    </div>
    <div class="row" style="border-bottom: 1px solid #e0e3e5">

    </div>
  </div>
</template>

<script>
export default {
  props: ['article', 'user'],
  methods: {
    threadDetail (event) {
      event.preventDefault()
      this.$router.push({path: 'thread', query: { id: this.article._id }})
    }
  }
}
</script>

<style lang="css" scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.vote,
.votes,
.replies {
  height: 38px;
  min-width: 20px;
  padding: 8px 5px;
  text-align: center;

}

.dempet {
  margin: 0;
}

.outer {
  padding-top: 20px;
}

.bungkus {
  margin-bottom: 10px;
  border: 1px solid #e0e3e5;
}
/** {
  border: solid 1px black;
}*/
</style>
