<style></style>

<template>
  <div>
  <b-card v-for="node in state" v-bind:title="node.name" v-bind:sub-title="node.version" id="about" style="width: 24rem;">
    <b-card-body>
      <b-list-group flush>
        <b-list-group-item>RSS {{ node.memory.rss | prettyBytes(2) }}</b-list-group-item>
        <b-list-group-item>External {{ node.memory.external | prettyBytes(2) }}</b-list-group-item>
        <b-list-group-item>Heap Used {{ node.memory.heapUsed | prettyBytes(2) }}</b-list-group-item>
        <b-list-group-item>Heap Total {{ node.memory.heapTotal | prettyBytes(2) }}</b-list-group-item>
      </b-list-group>
      <b-list-group flush>
        <b-list-group-item>Platform {{ node.platform }}</b-list-group-item>
        <b-list-group-item>{{ $duration(node.uptime, "seconds").humanize() }} up</b-list-group-item>
      </b-list-group>
    <b-button href="#" variant="primary">Restart</b-button>
   </b-card-body>
  </b-card>
</div>
</template>

<script>
export default {
  name: "State",
  props: {
    state: {
      type: Array,
      default: [{
        name: "not connected",
        version: "unknown",
        platform: "unknown",
        uptime: 0,
        memory: { heapUsed: 0 }
      }]
    }
  },
  methods: {
    async refresh() {
      try {
        const data = await fetch("api/state");
        this.state = await data.json();
      } catch (e) {
        this.state = [{
          name: "not connected",
          version: "unknown",
          platform: "unknown",
          uptime: 0,
          memory: { heapUsed: 0 }
        }];
      }
    }
  },
  mounted() {
    this.refresh();
    this.interval = setInterval(() => {
      this.refresh();
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
