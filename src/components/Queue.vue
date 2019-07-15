<template>
  <b-card-group>
    <b-card id="queue" v-bind:title="$route.params.queue" v-bind:sub-title="Queue">
      <b-card-body>
        <b-link :to="{ name: 'jobs', params: { queue: item.name } }">Jobs</b-link>
      </b-card-body>

      <b-button-group>
        <b-button @click="pause">Pause</b-button>
        <b-button @click="resume">Resume</b-button>
        <b-button variant="warning" @click="empty">Empty</b-button>
      </b-button-group>
    </b-card>
  </b-card-group>
</template>

<script>
import { config } from '../../package.json';

export default {
  name: "Queue",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  methods: {
    async refresh() {
      const data = await fetch(`${config.api}/queue/${this.$route.params.queue}`);
      this.item = await data.json();
    },
    async pause() {
      return fetch(`${config.api}/queue/${this.$route.params.queue}/pause`, {
        method: "POST"
      });
    },
    async resume() {
      return fetch(`${config.api}/queue/${this.$route.params.queue}/resume`, {
        method: "POST"
      });
    },
    async empty() {
      return fetch(`${config.api}/queue/${this.$route.params.queue}/empty`, {
        method: "POST"
      });
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
