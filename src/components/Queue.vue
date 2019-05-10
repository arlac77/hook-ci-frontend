<template>
  <div class="view">
    Queue {{$route.params.queue}}

    <b-link :to="{ name: 'jobs', params: { queue: item.name } }">Jobs</b-link>

    <div>
      <b-button @click="pause">Pause</b-button>
      <b-button @click="resume">Resume</b-button>
      <b-button @click="empty">Empty</b-button>
    </div>
  </div>
</template>

<script>
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
        const data = await fetch(`api/queue/${this.$route.params.queue}`);
        this.item = await data.json();
      },
      async pause() {
        return fetch(`api/queue/${this.$route.params.queue}/pause`,{ method: 'POST'});
      },
      async resume() {
        return fetch(`api/queue/${this.$route.params.queue}/resume`,{ method: 'POST'});
      },
      async empty() {
        return fetch(`api/queue/${this.$route.params.queue}/empty`,{ method: 'POST'});
      }
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
