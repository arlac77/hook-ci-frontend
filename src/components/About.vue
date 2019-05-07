<style>
.header {
  padding: 10px 0;
}
</style>

<template>
  <div id="about">
    <h1 class="header bold">About</h1>
    Hook-CI {{ version }}
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    version: {
      type: String,
      default: "-unknown-"
    }
  },
  methods: {
    async refresh() {
      const data = await fetch("api/state");
      const state = await data.json();
      this.version = state.version;
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>
