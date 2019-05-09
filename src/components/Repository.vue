<template>
  <div class="view">
    Repository {{$route.params.repository}}
  </div>
</template>

<script>
export default {
  name: "Repository",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
};
</script>
