<template>
  <div id="app">
    <nav-bar/>
    <div class="container">
      <error/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Error from "./components/Error.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Error
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch {
    }
  }
};
</script>
