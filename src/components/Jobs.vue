<template>
  <div class="view">
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
        </tr>
      </thead>
      <tbody>
        <tr scope="row" v-for="job in jobs">
          <td>{{ job.id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Jobs",
  props: {
    jobs: {
      type: Array,
      default: []
    }
  },
  methods: {
    async refresh() {
      const data = await fetch("api/queue/request/jobs");
      const jobs = await data.json();
      this.jobs.length = 0;
      this.jobs.push(...jobs);
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>
