<style>
.log {
  white-space: pre;
  font-family: courier, "courier new", monospace;
}
</style>

<template>
  <div id="log" class="log">{{lines}}</div>
</template>

<script>
import { config } from '../../package.json';

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
      const data = await fetch(
        `${config.api}/queue/${this.$route.params.queue}/job/${
          this.$route.params.job
        }/log?start=0&end=15000`
      );
      const json = await data.json();
      this.lines = json.logs.join("\n");
    }
  },
  watch: {
    $route(from, to) {
      this.refresh();
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>
