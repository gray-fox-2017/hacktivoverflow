<template lang="html">
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>Connection timeout. Showing limited messages.</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Retry</md-button>
    </md-snackbar>
</template>

<script>
export default {
  props : ['alert'],
  data() {
    return {
      vertical : 'top',
      horizontal : center,
      duration : 4000
    }
  },
  methods: {
    open() {
      this.$refs.snackbar.open()
    }
  }
}
</script>

<style lang="css">
</style>
