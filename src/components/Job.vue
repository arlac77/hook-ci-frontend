<template>
  <b-card id="job" v-bind:title="$route.params.job" v-bind:sub-title="state">
    <b-card-body>
      <b-link
        :to="{
          name: 'jobs',
          params: { queue: $route.params.queue }
        }"
        class="card-link">
        {{ $route.params.queue }}
      </b-link>

      <b-link
        :to="{
          name: 'jobLog',
          params: { queue: $route.params.queue, job: $route.params.job }
        }"
        class="card-link">
        Log
      </b-link>

      <b-list-group flush>
        <b-list-group-item>
          processedOn
          {{
            processedOn | moment().format("MMMM Do YYYY, h:mm:ss a")
          }}</b-list-group-item>
        <b-list-group-item>
          finishedOn
          {{
            finishedOn | moment().format("MMMM Do YYYY, h:mm:ss a")
          }}</b-list-group-item>
        <b-list-group-item>State {{ state }}</b-list-group-item>
        <b-list-group-item># {{ attemptsMade }}</b-list-group-item>
      </b-list-group>

      <b-button-group>
        <b-button @click="cancel">Cancel</b-button>
      </b-button-group>
    </b-card-body>
    <div class="overflow-auto">
    <b-pagination-nav :link-gen="linkGen" :number-of-pages="jobs" use-router></b-pagination-nav>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "Job",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    // TODO find # of jobs
  return {
    jobs: 1000
  }
},

  methods: {
    async refresh() {
      const data = await fetch(
        `api/queue/${this.$route.params.queue}/job/${this.$route.params.job}`
      );
      this.item = await data.json();
    },
    linkGen(pageNum) {
      return {
        name: 'job',
        params: { job: pageNum }
      };
    },
    async cancel() {
      return fetch(
        `api/queue/${this.$route.params.queue}/job/${
          this.$route.params.job
        }/cancel`,
        { method: "POST" }
      );
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
