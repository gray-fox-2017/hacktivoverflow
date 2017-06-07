<template>
  <div>
  <h1> ini bakal jadi halaman login </h1>
  <app-signup> </app-signup>
  </div>
</template>

<script>
  import name from './SignUp.vue'
  export default{
    components: {
      'app-signup': name
    }
  }
</script>
