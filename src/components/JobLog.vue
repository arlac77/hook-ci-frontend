<template>
  <div id="log"">
    <p v-for="line in lines">{{line}}</p>
  </div>
</template>

<script>
export default {
  name: "JobLog",
  props: {
    lines: {
      type: Array,
      default: []
    }
  },
  methods: {
      async refresh() {
        const data = await fetch(`api/queue/${this.$route.params.queue}/job/${this.$route.params.job}/log?from=0&to=100`);
        const json = await data.json();
        this.lines = json.logs;
      },
    },
  watch: {
    '$route' (from, to) {
      this.refresh();
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>
