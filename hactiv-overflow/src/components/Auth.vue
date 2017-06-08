<template lang="html">
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          
        </div>
        <div class="col-md-4">
          <b-form-input v-model="name" type="text" placeholder="Enter your name" :state="text.length?'success':'warning'" :formatter="format"></b-form-input>
          <small class="text-muted">We will convert your name to lowercase instantly</small>

          <br>
          <br>

          <b-form-input v-model="email" type="text" placeholder="Enter your name" :state="text.length?'success':'warning'" :formatter="format" lazy-formatter></b-form-input>
            <small class="text-muted">This one is a little lazy!</small>

          <p>Value: {{text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style lang="css" scoped>
</style>
