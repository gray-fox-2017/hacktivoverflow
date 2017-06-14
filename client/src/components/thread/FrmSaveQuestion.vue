<template>
  <form>
    <div class="form-group">
      <label for="txtTitle">Title</label>
      <input type="text" v-model="question.title" class="form-control" id="txtTitle" placeholder="Input question title" maxlength="100">
    </div>

    <div class="form-group">
      <label for="txtDescr">Description</label>
      <textarea class="form-control" id="txtDescr"
        v-model="question.descr"
        placeholder="Input question description"
        rows="3"
        maxlength="300">
      </textarea>
    </div>

    <button type="submit" @click.prevent="onSubmit" class="btn btn-primary">{{ question._id !== null? 'Edit' : 'Save' }} Question</button>
    <button type="reset" v-if="question._id != null" @click.prevent="onReset">Reset</button>
  </form>
</template>
<script>
  export default {
    props: ['question'],
    methods: {
      onSubmit() {
        this.$emit('submit',this.question);
      },
      onReset() {
        this.$emit('reset');
      }
    }
  }
</script>