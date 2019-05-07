<style>
.header {
  padding: 10px 0;
}
</style>

<template>
  <div id="about">
    <h1 class="header bold">About</h1>
    <p>Hook-CI {{ version }}</p>
    <p>Uptime {{ uptime }}</p>
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    version: {
      type: String,
      default: "-unknown-"
    },
    uptime: {
      type: String,
      default: "0"
    }
  },
  methods: {
    async refresh() {
      const data = await fetch("api/state");
      const state = await data.json();
      this.version = state.version;
      this.uptime = state.uptime;
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>
