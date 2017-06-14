<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>

<script>
import navbar from '@/components/Navbar'
import foot from '@/components/Foot'

export default {
  name: 'app',
  components: {
    navbar,
    foot
  }
}
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
  }
</style>
