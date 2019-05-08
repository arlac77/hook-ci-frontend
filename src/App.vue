<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" sticky=true>
      <b-navbar-brand href="#">Hook CI</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/queues">Queues</b-nav-item>
          <b-nav-item href="#/queue/request/jobs">Request Jobs</b-nav-item>
          <b-nav-item href="#/about">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view> </router-view>
  </div>
</template>

<script>

export default {
  name: "App"
};
</script>
