<template>
  <div class="view">
    Queue {{name}} {{$route.params.queue}}

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
    name: {
      type: String,
      default: ""
    }
  },
  methods: {
      async refresh() {
        const data = await fetch(`api/queue/${this.$route.params.queue}`);
        this.items = await data.json();
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
