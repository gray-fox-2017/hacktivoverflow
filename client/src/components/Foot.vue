<template lang="html">
  <footer class="footer">
    <div class="columns">
      <div class="column">
        <p class="has-text-left">Made with by <i class="material-icons">favorite</i>&nbsp;<a class="twp" href="http://tirtawiryaputra.com" target="_blank">TWP</a></p>
      </div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column">
        <p class="has-text-right"> Powered by
        <a href="https://buefy.github.io/#/" target="_blank">buefy</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'foot'
}
</script>

<style scoped>
  .footer {
    background-color: #4f5f6f;
    padding: 2em 2em;
    color: whitesmoke;
    margin-top: 5em;
  }

  .twp {
    vertical-align: middle;
  }

  .footer a {
    color: #00d1b2;
  }

  .footer a:hover {
    color: #ff3860;
  }

  .material-icons {
    color: #fb866a;
    font-size: 1.1em;
    display: inline-flex;
    vertical-align: middle;
  }
</style>
