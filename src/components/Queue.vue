<template>
  <div class="view">
    Queue {{name}}
  </div>
</template>

<script>
export default {
  name: "Queue",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
};
</script>
