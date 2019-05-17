<template>
  <div id="job" class="card" style="width: 24rem;">
    <div class="card-header">
      <b-link
        :to="{
          name: 'jobs',
          params: { queue: $route.params.queue }
        }">{{ $route.params.queue }}</b-link>
       {{$route.params.job}}
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          processedOn {{ processedOn | moment().format("MMMM Do YYYY, h:mm:ss a") }}
        </li>
        <li class="list-group-item">
         {{ state }}
        </li>
      </ul>
    </div>
  </div>
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
  methods: {
      async refresh() {
        const data = await fetch(`api/queue/${this.$route.params.queue}/job/${this.$route.params.job}`);
        this.item = await data.json();
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
