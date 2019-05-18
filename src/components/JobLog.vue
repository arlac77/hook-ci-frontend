<template>
  <div id="log" style="white-space: pre">
    {{lines}}
  </div>
</template>

<script>
export default {
  name: "JobLog",
  props: {
    lines: {
      type: String,
      default: ""
    }
  },
  methods: {
      async refresh() {
        const data = await fetch(`api/queue/${this.$route.params.queue}/job/${this.$route.params.job}/log?from=0&to=100`);
        const json = await data.json();
        this.lines = json.logs.join('\n');
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
