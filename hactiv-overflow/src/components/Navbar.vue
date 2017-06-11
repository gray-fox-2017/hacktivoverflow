<template lang="html">
  <div id="app">
    <b-navbar toggleable type="inverse" variant="success">

      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" to="#">
        <span>Hacktiv Overflow</span>
      </b-link>

      <b-collapse is-nav id="nav_collapse">

        <b-nav is-nav-bar>
          <b-nav-item>Support</b-nav-item>
          <b-nav-item>Docs</b-nav-item>
          <b-nav-item>Contact Us</b-nav-item>
        </b-nav>

        <b-nav is-nav-bar class="ml-auto">

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item to="#">EN</b-dropdown-item>
            <b-dropdown-item to="#">ES</b-dropdown-item>
            <b-dropdown-item to="#">RU</b-dropdown-item>
            <b-dropdown-item to="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>

            <!-- Using text slot -->
            <template slot="text">
              <span style="font-weight: bold;">User</span>
            </template>

            <b-dropdown-item to="./registration">Sign In</b-dropdown-item>
            <b-dropdown-item to="#">Sign Up</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

import Auth from '@/components/Auth'
export default {
  // this if for script vue js and this is called MODEL!
  name: 'Auth',
  components: {
    Auth
  }
}
</script>
<!-- this fucking scoped for css navbar only not global and this is very important -->
<style lang="css" scoped>

/* this is place for css */
</style>
