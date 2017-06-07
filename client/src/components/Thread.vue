<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-3 flex-container">
        <div class="votes counter">
          <p>{{ article.upvotes.length - article.downvotes.length }}</p>
          <p>votes</p>
        </div>
        <div class="replies counter">
          <p>{{ article.replies.length }}</p>
          <p>replies</p>
        </div>
      </div>
      <div class="col-md-9">
        <h4>{{ article.title }}</h4>
        <h4><small>created by {{ article.creator.name }}</small></h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['article']
}
</script>

<style lang="css">
.flex-container {
  display: flex;
  flex-direction: row;
}

.counter {
  height: 38px;
  min-width: 38px;
  padding: 8px 5px;
  text-align: center;
}
</style>
