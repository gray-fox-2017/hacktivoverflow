<template>
  <form>
    <div class="form-group">
      <label for="txtDescr">Description</label>
      <textarea class="form-control" id="txtDescr"
        v-model="answer.descr"
        placeholder="Input answer description"
        rows="3"
        maxlength="300"
        >
      </textarea>
    </div>

    <button type="submit" @click.prevent="onSubmit" class="btn btn-primary">{{ answer._id !== null? 'Edit' : 'Save' }} Answer</button>
    <button type="reset" v-if="answer._id !== null" @click.prevent="onReset">Reset</button>
  </form>
</template>
<script>
  export default {
    props: ['answer'],
    methods: {
      onSubmit() {
        console.log(this.answer)
        this.$emit('submit',this.answer);
      },
      onReset() {
        this.$emit('reset');
      }
    }
  }
</script>