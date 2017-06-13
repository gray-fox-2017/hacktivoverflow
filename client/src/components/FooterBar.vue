<template lang="html">
  <div id="footer">
    <md-toolbar class="md-dense">
      <!-- <md-button id="footgit" class="md-icon-button"> -->
      <a id="footgit" href="https://github.com/zanisis">
        <img  src="../assets/github.png" alt="github">
      </a>
      <!-- </md-button> -->
    </md-toolbar>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
export default {
}
</script>

<style lang="css" scoped>
#footer{
  margin-top: 20px;
  bottom: 0px;
  width: 100%
}
#footgit{
  flex : 1;
  text-align: center;
}
</style>
