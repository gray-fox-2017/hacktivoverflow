<template>
    <md-toolbar class="md-toolbar-container">
      <h2 class="md-title" style="flex: 1">HacktivOverflow</h2>
      <md-button>Thread</md-button>
      <div v-if="isLogin">
        <md-button>User</md-button>
        <md-button>Logout</md-button>
      </div>
      <div v-else>
        <md-button>Login</md-button>
        <md-button>Register</md-button>
      </div>
    </md-toolbar>
</template>

<script>
  export default {
    data: function() {
      return {
        token : localStorage.getItem('token'),
        isLogin: (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '')
      }
    }
  }
</script>