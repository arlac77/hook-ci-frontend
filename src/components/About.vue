<style>
.header {
  padding: 10px 0;
}
</style>

<template>
  <div id="about">
    <h1 class="header bold">About</h1>
    About {{ version }}
    XXXXX
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    version: {
      type: String,
      default: "1.11"
    }
  }
};
</script>
