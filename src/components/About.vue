<style></style>

<template>
  <div id="about" class="card" style="width: 24rem;">
    <div class="card-header">
      Hook-CI
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Version {{ state.version }}</li>
        <li class="list-group-item">Platform {{ state.platform }}</li>
        <li class="list-group-item">
          {{ $duration(state.uptime, "seconds").humanize() }} up
        </li>
        <li class="list-group-item">
          Heap Total {{ state.memory.heapTotal | prettyBytes(2) }}
        </li>
        <li class="list-group-item">
          Heap Used {{ state.memory.heapUsed | prettyBytes(2) }}
        </li>
        <li class="list-group-item">
          RSS {{ state.memory.rss | prettyBytes(2) }}
        </li>
        <li class="list-group-item">
          external {{ state.memory.external | prettyBytes(2) }}
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
      type: Object,
      default: {
        version: "unknown",
        platform: "unknown",
        uptime: 0,
        memory: { heapUsed: 0 }
      }
    }
  },
  methods: {
    async refresh() {
      try {
        const data = await fetch("api/state");
        this.state = await data.json();
      } catch (e) {
        this.state = {
          version: "unknown",
          platform: "unknown",
          uptime: 0,
          memory: { heapUsed: 0 }
        };
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
