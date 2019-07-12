<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" sticky="true">
    <b-navbar-brand :to="{ name: 'home' }">Hook CI</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'repositories' }">Repositories</b-nav-item>
        <b-nav-item :to="{ name: 'queues' }">Queues</b-nav-item>
        <b-nav-item :to="{ name: 'state' }">State</b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'profile' }">Profile</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
      this.$router.push({ path: "/" });
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    }
  },
  data() {
    return {
      isAuthenticated: false,
      profile: {}
    };
  }
};
</script>
