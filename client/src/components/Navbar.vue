<template lang="html">
  <header>
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item" href="index.html">
          <img src="../assets/so-icon.png" alt="HacktivOverflow logo">&nbsp;Hacktiv Overflow
        </a>
        <div class="nav-item is-hidden-mobile">
          <p class="control">
            <input class="input" type="text" placeholder="Search for questions">
          </p>
          <p class="control">
            <a class="button is-primary">Search</a>
          </p>
        </div>
      </div>
      <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
      <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->

      <div class="nav-right nav-menu">
        <div class="nav-item">
          <a href="#" class="nav-item button is-white"><i class="material-icons">account_circle</i>&nbsp;Register</a>
          <a href="index.html" class="nav-item button is-primary is-outlined"><i class="material-icons">launch</i>&nbsp;Login</a>
          <a href="index.html" class="nav-item button is-primary is-outlined"><i class="material-icons">exit_to_app</i>&nbsp;Logout</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="css">

</style>
