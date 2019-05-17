<template>
  <b-card v-bind:title="name">
    <b-card-body>
        Repository {{$route.params.repository}}
    </b-card-body>
  </b-card>
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
