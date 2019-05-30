<style></style>

<template>
  <b-card-group deck>
    <b-card
      v-for="node in state"
      v-bind:key="node.name"
      v-bind:title="node.name"
      v-bind:sub-title="node.version"
      id="state"
      style="width: 24rem"
    >
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
      </b-card-body>
      <b-button @click="restart" variant="primary">Restart</b-button>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: "State",
  props: {
    state: {
      type: Array,
      default: [
        {
          name: "not connected",
          version: "unknown",
          platform: "unknown",
          uptime: 0,
          memory: { heapUsed: 0 }
        }
      ]
    }
  },
  methods: {
    async refresh() {
      try {
        const data = await fetch("api/nodes/state");
        this.state = await data.json();
      } catch (e) {
        this.state = [
          {
            name: "not connected",
            version: "unknown",
            platform: "unknown",
            uptime: 0,
            memory: { heapUsed: 0 }
          }
        ];
      }
    },
    async restart() {
      const name = 'xxx';
      return fetch(`api/nodes/${name}/restart`, {
        method: "POST"
      });
    }
  },
  mounted() {
    this.refresh();
    this.interval = setInterval(() => {
      this.refresh();
    }, 5000);
    
    const socket = new WebSocket('wss://mfelten.dynv6.net/services/ci/api/');

    socket.addEventListener('error', event => {
      console.log('ERROR', event);
    });
    
    socket.addEventListener('open', event => {
      socket.send('Hello Server!');
    });

    socket.addEventListener('message', event => {
      console.log('Message from server ', event.data);
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
