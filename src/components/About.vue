<style></style>

<template>
  <div id="about" class="card" style="width: 24rem;">
    <div class="card-header">
      Hook-CI
    </div>

    <div v-for="node in state" class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Version {{ node.version }}</li>
        <li class="list-group-item">Platform {{ node.platform }}</li>
        <li class="list-group-item">
          {{ $duration(node.uptime, "seconds").humanize() }} up
        </li>
        <li class="list-group-item">
          Heap Total {{ node.memory.heapTotal | prettyBytes(2) }}
        </li>
        <li class="list-group-item">
          Heap Used {{ node.memory.heapUsed | prettyBytes(2) }}
        </li>
        <li class="list-group-item">
          RSS {{ node.memory.rss | prettyBytes(2) }}
        </li>
        <li class="list-group-item">
          external {{ node.memory.external | prettyBytes(2) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    state: {
      type: Array,
      default: [{
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
